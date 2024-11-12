import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const profile = await db.profile.findUnique({
        where: {
            id: locals.account.profile.id
        }
    });

    return {
        profile
    }
}) satisfies PageServerLoad;