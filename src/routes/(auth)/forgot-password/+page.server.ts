import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {
    if (locals.account) {
        redirect(302, '/');
    }
}

const resetPassword: Action = async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');

    if (typeof email !== 'string' ||
        !email) {
        return fail(400, { invalid: true })
    }

    const account = await db.account.findUnique({
        where: { email }
    })

    if (!account) {
        return fail(400, { invalid: true })
    }

    //TODO: reset password


    redirect(302, '/');
}

export const actions: Actions = { resetPassword }