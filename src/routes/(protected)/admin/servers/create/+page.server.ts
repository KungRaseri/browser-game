import { db } from "$lib/db"
import { Prisma } from "@prisma/client"
import { fail, redirect } from "@sveltejs/kit"
import type { Action, Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
    return {}
}

const createServer: Action = async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name")
    const hostname = data.get("hostname")
    const port = data.get("port")

    if (typeof name !== 'string' ||
        !name ||
        typeof hostname !== 'string' ||
        !hostname ||
        typeof port !== 'string' ||
        !port) {
        return fail(400, { invalid: true, message: "Invalid form data. Check form and try again" })
    }

    try {
        await db.server.create({
            data: {
                name,
                hostname,
                port: Number.parseInt(port)
            }
        })
    }
    catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return fail(400, { invalid: true, message: e.message })
            }
        } else {
            return fail(400, { invalid: true, message: `Unknown error occured: ${e}` })
        }
    }

    redirect(302, '/admin/servers');

}

export const actions: Actions = { createServer }
