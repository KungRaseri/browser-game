import { db } from "$lib/db"
import type { PageServerLoad, Actions, Action } from "./$types"
import { TileType } from "@prisma/client";

export const load: PageServerLoad = async ({ params }) => {
    const [world, regions, tiles, plots, biomes] = await db.$transaction([
        db.world.findUnique({
            where: {
                id: params.id
            }
        }),
        db.region.findMany({
            where: {
                worldId: params.id
            }
        }),
        db.tile.findMany({
            where: {
                Region: {
                    worldId: params.id
                }
            }
        }),
        db.plot.findMany({
            where: {
                Tile: {
                    Region: {
                        worldId: params.id
                    }
                }
            }
        }),
        db.biome.findMany()
    ]);

    const [landTiles, oceanTiles, settlements] = await db.$transaction([
        db.tile.count({
            where: {
                type: TileType.LAND,
                Region: {
                    worldId: params.id
                }
            }
        }),
        db.tile.count({
            where: {
                type: TileType.OCEAN,
                Region: {
                    worldId: params.id
                }
            }
        }),
        db.settlement.count({
            where: {
                Plot: {
                    Tile: {
                        Region: {
                            worldId: params.id
                        }
                    }
                },
            }
        })
    ])

    return {
        world,
        regions,
        biomes,
        tiles,
        plots,
        worldInfo: {
            landTiles,
            oceanTiles,
            settlements
        }
    }
}

export const actions: Actions = {}
