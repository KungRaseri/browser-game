import { generateMap } from "$lib/game/world-generator";
import type { Prisma } from "@prisma/client";

export async function generatePreview() {
    const generatedRegions: Prisma.RegionGetPayload<{
        include: { tiles: { include: { Biome: true; Plots: true } } };
    }>[][] = [];

    const elevationMap = await generateMap(
        {
            worldName: mapOptions.worldName,
            serverId: mapOptions.serverId,
            width: mapOptions.width,
            height: mapOptions.height,
            seed: mapOptions.elevationSeed
        },
        {
            octaves: elevationOptions.octaves,
            amplitude: elevationOptions.amplitude,
            persistence: elevationOptions.persistence,
            frequency: elevationOptions.frequency
        }
    );

    const precipitationMap = await generateMap(
        {
            worldName: mapOptions.worldName,
            serverId: mapOptions.serverId,
            width: mapOptions.width,
            height: mapOptions.height,
            seed: mapOptions.precipitationSeed
        },
        {
            octaves: precipitationOptions.octaves,
            amplitude: precipitationOptions.amplitude,
            persistence: precipitationOptions.persistence,
            frequency: precipitationOptions.frequency
        }
    );

    const temperatureMap = await generateMap(
        {
            worldName: mapOptions.worldName,
            serverId: mapOptions.serverId,
            width: mapOptions.width,
            height: mapOptions.height,
            seed: mapOptions.temperatureSeed
        },
        {
            octaves: temperatureOptions.octaves,
            amplitude: temperatureOptions.amplitude,
            persistence: temperatureOptions.persistence,
            frequency: temperatureOptions.frequency
        }
    );

    for (const [x, row] of elevationMap.entries()) {
        generatedRegions[x] = [];
        for (const [y, column] of row.entries()) {
            generatedRegions[x][y] = {
                id: '',
                worldId: '',
                xCoord: x,
                yCoord: y,
                name: `${x}:${y}`,
                elevationMap: elevationMap[x][y],
                precipitationMap: precipitationMap[x][y],
                temperatureMap: temperatureMap[x][y],
                tiles: []
            };

            for (const [z, elevation] of column.entries()) {
                const type = elevation < 0 ? TileType.OCEAN : TileType.LAND;
                const biome = await determineBiome(
                    normalizeValue(precipitationMap[x][y], 0, 450),
                    normalizeValue(temperatureMap[x][y], -10, 32)
                );

                generatedRegions[x][y].tiles.push({
                    id: '',
                    regionId: '',
                    biomeId: '',
                    type,
                    elevation: elevation,
                    precipitation: precipitationMap[x][y][z],
                    temperature: temperatureMap[x][y][z],
                    Biome: {},
                    Plots: {}
                });
            }
        }
    }

    regions = generatedRegions.flat(1);
}