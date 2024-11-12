import { redirect, type Handle, type HandleServerError } from "@sveltejs/kit";
import { getContext } from "svelte";
import type { Configuration } from "$lib/stores/system/configuration";

import { AuthenticateUser } from "$lib/auth";
import { db } from "$lib/db";

let IsDatabaseInitialized = false;
export const handle: Handle = (async ({ event, resolve }) => {
    // does database exist?
    // if (!event.route.id?.includes('(protected)/admin/init'))
    //     try {
    //         await db.$queryRaw<number>`SELECT 1`;
    //         IsDatabaseInitialized = true;
    //     }
    //     catch (e) {
    //         throw redirect(307, `/admin/init`);
    //     }

    // if not, start initialization process
    // redirect to
    IsDatabaseInitialized = true;

    //if so, continue is usual...
    if (IsDatabaseInitialized) {
        const user = await AuthenticateUser(event.cookies);

        if (!user) {
            if (event.route.id?.includes('(protected)'))
                redirect(307, `/sign-in?redirectTo=${event.url.pathname}`);

        } else {
            if (user && user.role !== "ADMINISTRATOR" && event.route.id?.includes('(protected)/admin'))
                redirect(307, `/sign-in?redirectTo=${event.url.pathname}`);

            event.locals.account = user;
        }
    }

    const response = await resolve(event);

    return response
}) satisfies Handle

export const handleError: HandleServerError = (async ({ error, event }) => {
    const errorId = crypto.randomUUID();

    const errorResponse = {
        message: `${event.url.search} at ${event.url.pathname} failed.`,
        error,
        errorId
    };

    console.log(errorResponse);

    return errorResponse;
}) satisfies HandleServerError;