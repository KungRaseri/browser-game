import { db } from "$lib/db"
import type { Prisma, Region } from "@prisma/client"
import { fail, redirect } from "@sveltejs/kit"
import type { Action, Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
    return {
        servers: await db.server.findMany({
            select: {
                id: true,
                name: true
            }
        })
    }
}

const saveWorld: Action = async ({ request }) => {
    const data = await request.formData();
    const map = data.get("map")
    const mapOptions = data.get("map-options")
    const elevationOptions = data.get("elevation-options")
    const precipitationOptions = data.get("precipitation-options")
    const temperatureOptions = data.get("temperature-options")

    if (typeof map !== 'string' ||
        !map ||
        typeof mapOptions !== 'string' ||
        !mapOptions ||
        typeof elevationOptions !== 'string' ||
        !elevationOptions ||
        typeof precipitationOptions !== 'string' ||
        !precipitationOptions ||
        typeof temperatureOptions !== 'string' ||
        !temperatureOptions) {
        return fail(400, { invalid: true, message: 'Some properties were invalid or were not provided.' })
    }

    const generatedMap: Region[] = JSON.parse(map);
    const mapSettings = JSON.parse(mapOptions);
    const elevationSettings = JSON.parse(elevationOptions);
    const precipitationSettings = JSON.parse(precipitationOptions);
    const temperatureSettings = JSON.parse(temperatureOptions);

    // create the world

    const world = await db.world.create({
        data: {
            name: mapSettings.worldName,
            serverId: mapSettings.serverId,
            elevationSettings,
            precipitationSettings,
            temperatureSettings
        },
        include: {
            server: true
        }
    })

    // iterate through the generatedMap,
    for (const generatedRegion of generatedMap) {
        const elevationMap: number[][] = JSON.parse(JSON.stringify(generatedRegion?.elevationMap))
        const precipitationMap: number[][] = JSON.parse(JSON.stringify(generatedRegion?.precipitationMap))
        const temperatureMap: number[][] = JSON.parse(JSON.stringify(generatedRegion?.temperatureMap))

        const region = await db.region.create({
            data: {
                name: generatedRegion.name,
                elevationMap: generatedRegion.elevationMap as Prisma.JsonArray,
                precipitationMap: generatedRegion.precipitationMap as Prisma.JsonArray,
                temperatureMap: generatedRegion.temperatureMap as Prisma.JsonArray,
                worldId: world.id
            },
            include: {
                world: true,
            }
        });

        elevationMap.forEach(async (row, x) => {
            row.forEach(async (elevation, y) => {
                // create tiles, 
                const tile = await db.tile.create({
                    data: {
                        id: crypto.randomUUID(),
                        elevation: elevation,
                        precipitation: precipitationMap[x][y],
                        temperature: temperatureMap[x][y],
                        regionId: region.id
                    },
                    include: {
                        region: true
                    }
                });
            })
        })
    }

    throw redirect(302, '/admin/worlds')
}

export const actions: Actions = { saveWorld }
