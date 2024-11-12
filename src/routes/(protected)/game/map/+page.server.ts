import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const server = await db.server.findFirstOrThrow();
    const world = await db.world.findUniqueOrThrow({
        where: {
            name_serverId: {
                name: 'World 1',
                serverId: server.id
            }
        }
    });

    const regions = await db.region.findMany({
        where: {
            worldId: world.id
        }
    });

    const tiles = await db.tile.findMany({
        where: {
            regionId: {
                in: regions.map(region => region.id)
            }
        }
    });

    const biomes = await db.biome.findMany();

    return {
        server,
        world,
        regions,
        tiles,
        biomes
    };

}) satisfies PageServerLoad;