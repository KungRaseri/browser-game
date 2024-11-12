import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcryptjs';
import { AccountRole } from '@prisma/client';


export const load: PageServerLoad = async ({ locals }) => {
    if (locals.account) {
        redirect(302, '/');
    }
}

const register: Action = async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (typeof email !== 'string' ||
        typeof password !== 'string' ||
        !email ||
        !password) {
        return fail(400, { invalid: true })
    }

    const account = await db.account.findUnique({
        where: { email }
    })

    if (account) {
        return fail(400, { invalid: true, exists: true })
    }

    if (password.length < 16) {
        return fail(400, { invalid: true, length: true })
    }

    const newAccount = await db.account.create({
        data: {
            email,
            passwordHash: await bcrypt.hash(password, 10),
            role: AccountRole.MEMBER,
            userAuthToken: crypto.randomUUID()
        }
    });

    cookies.set('session', newAccount.userAuthToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 6 // 30 days if remember me is checked, otherwise it's 6 hours
    })

    redirect(302, '/');
}

export const actions: Actions = { register }