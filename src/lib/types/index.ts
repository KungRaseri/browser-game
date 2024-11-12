export type ErrorResponse = {
    invalid: boolean;
    message: string;
};

export type MapOptions = {
    serverId: string | null, worldName: string | null, width: number, height: number, seed: number
}