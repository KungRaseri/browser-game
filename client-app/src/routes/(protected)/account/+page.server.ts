import { db } from '$lib/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ locals }) => {
    const accountFullDetails = await db.account.findUnique({
        where: {
            id: locals.account.id
        },
        include: {
            playerProfiles: true
        }
    })

    if (!accountFullDetails) {
        return fail(404, { notfound: true })
    }

    accountFullDetails.passwordHash = '';

    return {
        account: accountFullDetails,
        profile: locals.playerProfile
    };
}) 