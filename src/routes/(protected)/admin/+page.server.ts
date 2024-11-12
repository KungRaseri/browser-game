import { db } from "$lib/db"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
    return {
        servers: await db.server.findMany()
    }
}