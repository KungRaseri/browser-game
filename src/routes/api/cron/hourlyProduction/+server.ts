import { db } from '$lib/db'
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const settlements = await db.settlement.findMany({
        include: {
            Plot: true
        }
    })

    for (const settlement of settlements) {
        await db.resources.update({
            data: {
                food: {
                    increment: settlement.Plot.food
                },
                water: {
                    increment: settlement.Plot.water
                },
                wood: {
                    increment: settlement.Plot.wood
                },
                stone: {
                    increment: settlement.Plot.stone
                },
                ore: {
                    increment: settlement.Plot.ore
                }
            },
            where: {
                id: settlement.resourcesId
            }
        });
    }

    return new Response("ok");
};