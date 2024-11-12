import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const settlements = await db.settlement.findMany({
        where: {
            PlayerProfile: {
                profileId: locals.account.profile.id,
                serverId: (await db.server.findFirst())?.id //TODO: update when server swapping is available
            },
        },
        include: {
            Plot: true,
            Resources: true,
            Structures: true
        }
    })

    return {
        settlements
    }
}) satisfies PageServerLoad;