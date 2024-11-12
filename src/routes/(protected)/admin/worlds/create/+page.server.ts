import { db } from "$lib/db"
import type { Biome } from "@prisma/client"
import type { Actions, PageServerLoad } from "./$types"

let biomes: Biome[] = [];

export const load: PageServerLoad = async () => {
    biomes = await db.biome.findMany() ?? [];

    return {
        servers: await db.server.findMany({
            select: {
                id: true,
                name: true
            }
        }),
        biomes
    }
}

export const actions: Actions = {}