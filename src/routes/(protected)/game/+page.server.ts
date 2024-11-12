import { db } from "$lib/db"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.account.profile) {
        redirect(302, '/game/getting-started');
    }

    const settlements = await db.settlement.findMany({
        where: {
            PlayerProfile: {
                profileId: locals.account.profile.id,
                serverId: (await db.server.findFirst())?.id //TODO: update when server swapping is available
            },
        },
        include: {
            Plot: {
                include: {
                    Settlement: true,
                    Tile: true
                }
            },
            Resources: true,
            Structures: true,
        }
    })

    return {
        settlements
    }
}