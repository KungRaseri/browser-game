import { db } from '$lib/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const settlement = await db.settlement.findUnique({
        where: {
            id: params.id
        },
        include: {
            Plot: {
                include: {
                    Tile: true
                }
            },
            Resources: true,
            Structures: {
                include: {
                    Structure: true
                }
            }
        }
    })

    if (!settlement)
        throw fail(404, { invalid: true, params: params.id })

    const structures = await db.structure.findMany();

    return {
        settlement,
        structures
    }
}) satisfies PageServerLoad;