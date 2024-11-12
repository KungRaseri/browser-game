import { fail } from "@sveltejs/kit"
import { db } from "$lib/db"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
    const account = await db.account.findUnique({
        where: {
            id: params.id
        },
        select: {
            id: true,
            email: true,
            role: true,
            profile: true,
            userAuthToken: true,
            createdAt: true,
            updatedAt: true
        }
    });

    if (!account) {
        throw fail(404, { success: false, id: params.id })
    }

    return {
        account
    }
}
