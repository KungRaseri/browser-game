import { determineBiome, determinePlotData, determinePlotsTotal, normalizeValue, generateMap } from '$lib/game/world-generator'
import { TileType } from '@prisma/client';
import type { Biome, Plot, Region, Tile, World } from '@prisma/client';
import { fail, json } from '@sveltejs/kit';
import cuid from 'cuid';
import type { Options } from 'fractal-noise';

let world: World;
let regions: Region[];
let tiles: Tile[];
let plots: Plot[];


let mapSettings: any;
let biomes: Biome[] = []

let elevationSettings: Options;
let precipitationSettings: Options;
let temperatureSettings: Options;
let elevationMap: number[][][][];
let precipitationMap: number[][][][];
let temperatureMap: number[][][][];

let generatedRegions: Region[][];


export async function POST({ request }): Promise<Response> {
    const data = await request.formData();

    console.log(data)

    const mapOptions = data.get("MapOptions");
    const biomesData = data.get("Biomes");
    const elevationOptions = data.get("ElevationOptions");
    const precipitationOptions = data.get("PrecipitationOptions");
    const temperatureOptions = data.get("TemperatureOptions");

    if (!mapOptions ||
        !biomesData ||
        !elevationOptions ||
        !precipitationOptions ||
        !temperatureOptions) {
        throw fail(400, { invalid: true, message: 'Some properties were invalid or were not provided.' })
    }

    mapSettings = JSON.parse(mapOptions.toString());
    biomes = JSON.parse(biomesData.toString());
    elevationSettings = JSON.parse(elevationOptions.toString());
    precipitationSettings = JSON.parse(precipitationOptions.toString());
    temperatureSettings = JSON.parse(temperatureOptions.toString());

    await generateMaps()

    initializeWorld();
    initializeRegions();
    initializeTiles();
    initializePlots();

    return json({ world, regions, tiles, plots })
}

async function generateMaps() {
    elevationMap = await generateMap(
        {
            worldName: mapSettings.worldName,
            serverId: mapSettings.serverId,
            width: mapSettings.width,
            height: mapSettings.height,
            seed: mapSettings.elevationSeed
        },
        {
            octaves: elevationSettings.octaves,
            amplitude: elevationSettings.amplitude,
            persistence: elevationSettings.persistence,
            frequency: elevationSettings.frequency
        }
    );

    precipitationMap = await generateMap(
        {
            worldName: mapSettings.worldName,
            serverId: mapSettings.serverId,
            width: mapSettings.width,
            height: mapSettings.height,
            seed: mapSettings.precipitationSeed
        },
        {
            octaves: elevationSettings.octaves,
            amplitude: elevationSettings.amplitude,
            persistence: elevationSettings.persistence,
            frequency: elevationSettings.frequency
        }
    );

    temperatureMap = await generateMap(
        {
            worldName: mapSettings.worldName,
            serverId: mapSettings.serverId,
            width: mapSettings.width,
            height: mapSettings.height,
            seed: mapSettings.temperatureSeed
        },
        {
            octaves: temperatureSettings.octaves,
            amplitude: temperatureSettings.amplitude,
            persistence: temperatureSettings.persistence,
            frequency: temperatureSettings.frequency
        }
    );
}

function initializeWorld() {
    world = {
        id: cuid(),
        name: mapSettings.worldName,
        serverId: mapSettings.serverId,
        elevationSettings: JSON.stringify(elevationSettings),
        precipitationSettings: JSON.stringify(precipitationSettings),
        temperatureSettings: JSON.stringify(temperatureSettings),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    }
}

function initializeRegions() {
    generatedRegions = [];

    for (let i = 0; i < elevationMap.length; i++) {
        generatedRegions[i] = [];
        for (let j = 0; j < elevationMap[i].length; j++) {
            generatedRegions[i][j] = {
                id: cuid(),
                worldId: world.id,
                xCoord: i,
                yCoord: j,
                name: `${i}:${j}`,
                elevationMap: elevationMap[i][j],
                precipitationMap: precipitationMap[i][j],
                temperatureMap: temperatureMap[i][j]
            };
        }
    }

    regions = generatedRegions.flat(1)
}

function initializeTiles() {
    tiles = []
    for (const key of regions.keys()) {

        const elevationMap = regions[key].elevationMap as number[][]
        const precipitationMap = regions[key].precipitationMap as number[][]
        const temperatureMap = regions[key].temperatureMap as number[][]

        for (const [x, row] of elevationMap.entries()) {
            for (const [y, elevation] of row.entries()) {
                const type = elevation < 0 ? TileType.OCEAN : TileType.LAND;
                const biome = determineBiome(biomes, normalizeValue(precipitationMap[x][y], 0, 450), normalizeValue(temperatureMap[x][y], -10, 32))

                tiles.push({
                    id: cuid(),
                    regionId: regions[key].id,
                    biomeId: biome.id,
                    type,
                    elevation: elevationMap[x][y],
                    precipitation: precipitationMap[x][y],
                    temperature: temperatureMap[x][y]
                });
            }
        }
    }
}

function initializePlots() {
    plots = []
    for (const tile of tiles) {
        const biome = biomes.find(biome => biome.id === tile.biomeId)
        if (biome === undefined) return;

        const plotsTotal = determinePlotsTotal(tile.elevation, biome);

        for (let i = 0; i < plotsTotal; i++) {
            const plotData: Plot = determinePlotData(tile, biome);
            plots.push(plotData);
        }
    }
}
