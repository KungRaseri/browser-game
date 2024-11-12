import { writable } from 'svelte/store';
export const configuration = writable<Configuration>();

export class Configuration {
    IsDatabaseInitialized = false
}