import type { PageServerLoad } from "./$types"
import { db } from "$lib/db"

export const load: PageServerLoad = async () => {
    const accounts = await db.account.findMany({
        select: {
            id: true,
            email: true,
            role: true,
            profile: {
                include: {
                    servers: {
                        include: {
                            profile: true,
                            server: true,
                            settlements: true
                        }
                    }
                }
            },
            createdAt: true,
            updatedAt: true,
        }
    });

    return {
        accounts
    }
}
