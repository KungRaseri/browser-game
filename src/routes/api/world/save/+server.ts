import { db } from '$lib/db';
import type { Plot, Prisma, Region, Tile, World } from '@prisma/client';
import { fail, json, redirect } from '@sveltejs/kit';

export async function POST({ request }): Promise<Response> {
    const data = await request.formData();

    const world: World = await new Response(data.get('world')).json();
    const regions: Region[] = await new Response(data.get('regions')).json();
    const tiles: Tile[] = await new Response(data.get('tiles')).json();
    const plots: Plot[] = await new Response(data.get('plots')).json();

    if (!world || !regions || !tiles || !plots) {
        throw fail(400, { invalid: true, message: 'Some properties were invalid or were not provided.' })
    }

    const result = await db.$transaction([
        db.world.create({
            data: {
                id: world.id,
                name: world.name,
                serverId: world.serverId,
                elevationSettings: world.elevationSettings as Prisma.InputJsonValue,
                precipitationSettings: world.precipitationSettings as Prisma.InputJsonValue,
                temperatureSettings: world.temperatureSettings as Prisma.InputJsonValue,
                createdAt: world.createdAt,
                updatedAt: world.updatedAt
            }
        }),
        db.region.createMany({
            data: regions as Prisma.Enumerable<Prisma.RegionCreateManyInput>
        }),
        db.tile.createMany({
            data: tiles as Prisma.Enumerable<Prisma.TileCreateManyInput>
        }),
        db.plot.createMany({
            data: plots as Prisma.Enumerable<Prisma.PlotCreateManyInput>
        })
    ])

    if (!result)
        throw fail(500, { invalid: true, message: 'DB Transaction failed' })

    return json({ result }, {});
};