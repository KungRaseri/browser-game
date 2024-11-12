import { db } from "$lib/db";
import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import bcrypt from 'bcryptjs';
import { TimeSpan } from "$lib/timespan";

export const load: PageServerLoad = async ({ locals, url }) => {
    if (locals.account)
        redirect(302, '/');

    return {
        redirectTo: url.searchParams.get('redirectTo') ?? '/'
    }
}

const login: Action = async ({ cookies, request, url }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    const rememberMeIsChecked = data.get('remember_me');

    if (typeof email !== 'string' ||
        typeof password !== 'string' ||
        !email ||
        !password) {
        return fail(400, { email, invalid: true })
    }

    const account = await db.account.findUnique({
        where: { email }
    })

    if (!account || !await bcrypt.compare(password, account.passwordHash)) {
        return fail(400, { email, incorrect: true })
    }

    const userAuthToken = crypto.randomUUID();

    await db.account.update({
        where: { email: account.email },
        data: { userAuthToken: userAuthToken }
    })

    const ts = new TimeSpan();
    ts.days = 30;

    const age30d = ts.totalSeconds
    ts.days = 0;
    ts.hours = 6;
    const age6h = ts.totalSeconds

    cookies.set('session', userAuthToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: (rememberMeIsChecked) ? age30d : age6h // 30 days if remember me is checked, otherwise it's 6 hours
    })

    redirect(303, url.searchParams.get('redirectTo') ?? '/');
}

export const actions: Actions = { login }