import { makeNoise2D } from 'open-simplex-noise';
import { makeRectangle, type Options } from 'fractal-noise';
import type { Biome, Tile } from '@prisma/client';
import cuid from 'cuid';
import type { MapOptions } from '$lib/types';

function chunks(heightMap: number[][], chunkSize: number) {
    const splitChunks: number[][][][] = [];

    if (chunkSize === 0)
        return splitChunks;

    const height = heightMap.length;
    const width = heightMap[0].length;

    for (let i = 0; i < height; i += chunkSize) {
        const rowChunks = []
        for (let j = 0; j < width; j += chunkSize) {
            const chunk = [];

            for (let y = i; y < i + chunkSize; y++) {
                if (y >= height) break;
                const row = heightMap[y];
                const slicedRow = row.slice(j, j + chunkSize);
                chunk.push(slicedRow);
            }
            rowChunks.push(chunk);
        }
        splitChunks.push(rowChunks);
    }

    return splitChunks;
}

export async function generateMap(mapOptions: MapOptions, options: Options) {
    const { amplitude, persistence, frequency, octaves, scale } = options;

    const noiseFn = makeNoise2D(mapOptions.seed);

    const map = makeRectangle(mapOptions.width, mapOptions.height, noiseFn, {
        amplitude,
        persistence,
        frequency,
        octaves,
        scale: scale
    })

    return chunks(map, 10)
}

export function normalizeValue(value: number, min: number, max: number) {
    return value * (max - min) / 2 + (max + min) / 2;
}

export function determinePlotsTotal(elevation: number, biome: Biome) {
    if (elevation <= 0) return 0; // make sure to return 0 plots for oceanic tiles.

    return Math.floor(Math.random() * (biome.plotsMax - biome.plotsMin + 1)) + biome.plotsMin;
}

export function determinePlotData(tile: Tile, biome: Biome) {
    const area = Math.floor(Math.random() * (biome.plotAreaMax - biome.plotAreaMin + 1)) + biome.plotAreaMin;

    const solar = Math.floor(biome.solarModifier + ((tile.elevation + 1) * 2) + ((tile.temperature + 1) * 2) - ((tile.precipitation + 1) * 2))
    const wind = Math.floor(biome.windModifier + ((tile.temperature + 1) * 1.5) + ((tile.precipitation + 1) * 1.5))

    const food = determineFood(tile.elevation, tile.precipitation, tile.temperature, solar, wind);
    const water = determineWater(tile.elevation, tile.precipitation, tile.temperature, solar, wind);

    const wood = Math.round((tile.elevation + tile.precipitation + tile.temperature + solar) / 4)
    const stone = Math.round((tile.elevation + tile.precipitation + tile.temperature + wind) / 4)
    const ore = Math.round((tile.elevation + tile.precipitation + tile.temperature + solar + wind) / 5)

    return { id: cuid(), tileId: tile.id, area, solar, wind, food, water, wood, stone, ore }
}

export function determineSolar(elevation: number, precipitation: number, temperature: number) {
    // Determine base solar value based on elevation
    let solar = 1;

    if (elevation > 0) {
        solar += elevation / 10000;
        if (solar > 5) solar = 5;
    } else {
        solar -= Math.abs(elevation) / 10000;
        if (solar < 1) solar = 1;
    }

    // Adjust solar based on precipitation
    solar -= precipitation / 150;
    if (solar < 1) solar = 1;

    // Adjust solar based on temperature
    solar += temperature / 20;
    if (solar > 5) solar = 5;

    return Math.round(solar);
}

export function determineWind(elevation: number, precipitation: number, temperature: number) {
    // Determine base wind value based on elevation
    let wind = 5;
    if (elevation > 0) {
        wind -= elevation / 10000;
        if (wind < 1) wind = 1;
    } else {
        wind += Math.abs(elevation) / 10000;
        if (wind > 5) wind = 5;
    }

    // Adjust wind based on precipitation
    wind += precipitation / 150;
    if (wind > 5) wind = 5;

    // Adjust wind based on temperature
    wind -= temperature / 20;
    if (wind < 1) wind = 1;

    return Math.round(wind);
}

export function determineFood(elevation: number, precipitation: number, temperature: number, solar: number, wind: number) {
    let food = (elevation + precipitation + temperature) / 3

    food += (solar - wind) / 10;

    return Math.round(Math.max(1, Math.min(5, food)))
}

export function determineWater(elevation: number, precipitation: number, temperature: number, solar: number, wind: number) {
    let water = (elevation + precipitation + temperature) / 3

    water += (solar + wind) / 10;

    return Math.round(Math.max(1, Math.min(5, water)))
}

export function determineBiome(biomes: Biome[], precipitation: number, temperature: number) {
    let filteredBiomes = biomes.filter(biome =>
        Math.round(precipitation) >= biome.precipitationMin && Math.round(precipitation) <= biome.precipitationMax
        && Math.round(temperature) >= biome.temperatureMin && Math.round(temperature) <= biome.temperatureMax)

    if (!filteredBiomes.length)
        filteredBiomes = filteredBiomes.concat(biomes.filter(biome =>
            Math.round(precipitation) >= biome.precipitationMin && Math.round(precipitation) <= biome.precipitationMax));

    return filteredBiomes[Math.floor(Math.random() * filteredBiomes.length)];
}
