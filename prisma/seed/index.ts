import type { Biome, Structure } from '@prisma/client';
import { PrismaClient } from "@prisma/client";
import cuid from 'cuid';

const prisma = new PrismaClient();

const biomes: Biome[] = [
    {
        id: cuid(),
        name: "TUNDRA",
        precipitationRange: [10, 175],
        precipitationMin: 10,
        precipitationMax: 175,
        temperatureRange: [-10, 5],
        temperatureMin: -10,
        temperatureMax: 5,
        solarModifier: 2,
        windModifier: 2,
        foodModifier: 1,
        waterModifier: 1,
        woodModifier: 1,
        stoneModifier: 1,
        oreModifier: 1,
        plotsRange: [0, 6],
        plotsMin: 0,
        plotsMax: 6,
        plotAreaRange: [50, 70],
        plotAreaMin: 50,
        plotAreaMax: 70
    },
    {
        id: cuid(),
        name: "FOREST_BOREAL",
        precipitationRange: [25, 300],
        precipitationMin: 25,
        precipitationMax: 300,
        temperatureRange: [-5, 10],
        temperatureMin: -5,
        temperatureMax: 10,
        solarModifier: 2,
        windModifier: 1,
        foodModifier: 2,
        waterModifier: 2,
        woodModifier: 2,
        stoneModifier: 1,
        oreModifier: 1,
        plotsRange: [2, 8],
        plotsMin: 2,
        plotsMax: 8,
        plotAreaRange: [50, 85],
        plotAreaMin: 50,
        plotAreaMax: 85
    },
    {
        id: cuid(),
        name: "FOREST_TEMPERATE_SEASONAL",
        precipitationRange: [50, 350],
        precipitationMin: 50,
        precipitationMax: 350,
        temperatureRange: [4, 22],
        temperatureMin: 4,
        temperatureMax: 22,
        solarModifier: 2,
        windModifier: 1,
        foodModifier: 2,
        waterModifier: 2,
        woodModifier: 2,
        stoneModifier: 2,
        oreModifier: 2,
        plotsRange: [3, 8],
        plotsMin: 3,
        plotsMax: 8,
        plotAreaRange: [55, 95],
        plotAreaMin: 55,
        plotAreaMax: 95
    },
    {
        id: cuid(),
        name: "FOREST_TROPICAL_SEASONAL",
        precipitationRange: [50, 350],
        precipitationMin: 50,
        precipitationMax: 350,
        temperatureRange: [20, 32],
        temperatureMin: 20,
        temperatureMax: 32,
        solarModifier: 3,
        windModifier: 1,
        foodModifier: 3,
        waterModifier: 3,
        woodModifier: 3,
        stoneModifier: 2,
        oreModifier: 2,
        plotsRange: [3, 9],
        plotsMin: 3,
        plotsMax: 9,
        plotAreaRange: [55, 100],
        plotAreaMin: 55,
        plotAreaMax: 100
    },
    {
        id: cuid(),
        name: "RAINFOREST_TEMPERATE",
        precipitationRange: [175, 375],
        precipitationMin: 175,
        precipitationMax: 375,
        temperatureRange: [7, 25],
        temperatureMin: 7,
        temperatureMax: 25,
        solarModifier: 2,
        windModifier: 1,
        foodModifier: 2,
        waterModifier: 3,
        woodModifier: 3,
        stoneModifier: 2,
        oreModifier: 2,
        plotsRange: [3, 9],
        plotsMin: 3,
        plotsMax: 9,
        plotAreaRange: [60, 95],
        plotAreaMin: 60,
        plotAreaMax: 95
    },
    {
        id: cuid(),
        name: "RAINFOREST_TROPICAL",
        precipitationRange: [225, 450],
        precipitationMin: 225,
        precipitationMax: 450,
        temperatureRange: [24, 31],
        temperatureMin: 24,
        temperatureMax: 31,
        solarModifier: 3,
        windModifier: 1,
        foodModifier: 3,
        waterModifier: 3,
        woodModifier: 3,
        stoneModifier: 2,
        oreModifier: 2,
        plotsRange: [4, 10],
        plotsMin: 4,
        plotsMax: 10,
        plotAreaRange: [65, 100],
        plotAreaMin: 65,
        plotAreaMax: 100
    },
    {
        id: cuid(),
        name: "WOODLAND",
        precipitationRange: [15, 150],
        precipitationMin: 15,
        precipitationMax: 150,
        temperatureRange: [-2, 23],
        temperatureMin: -2,
        temperatureMax: 23,
        solarModifier: 2,
        windModifier: 1,
        foodModifier: 2,
        waterModifier: 1,
        woodModifier: 2,
        stoneModifier: 1,
        oreModifier: 1,
        plotsRange: [1, 7],
        plotsMin: 1,
        plotsMax: 7,
        plotAreaRange: [50, 75],
        plotAreaMin: 50,
        plotAreaMax: 75
    },
    {
        id: cuid(),
        name: "SHRUBLAND",
        precipitationRange: [15, 125],
        precipitationMin: 15,
        precipitationMax: 125,
        temperatureRange: [-2, 23],
        temperatureMin: -2,
        temperatureMax: 23,
        solarModifier: 2,
        windModifier: 1,
        foodModifier: 1,
        waterModifier: 1,
        woodModifier: 2,
        stoneModifier: 1,
        oreModifier: 1,
        plotsRange: [1, 7],
        plotsMin: 1,
        plotsMax: 7,
        plotAreaRange: [50, 70],
        plotAreaMin: 50,
        plotAreaMax: 70
    },
    {
        id: cuid(),
        name: "SAVANNA",
        precipitationRange: [50, 275],
        precipitationMin: 50,
        precipitationMax: 275,
        temperatureRange: [22, 32],
        temperatureMin: 22,
        temperatureMax: 32,
        solarModifier: 3,
        windModifier: 2,
        foodModifier: 3,
        waterModifier: 2,
        woodModifier: 1,
        stoneModifier: 1,
        oreModifier: 1,
        plotsRange: [2, 8],
        plotsMin: 2,
        plotsMax: 8,
        plotAreaRange: [55, 95],
        plotAreaMin: 55,
        plotAreaMax: 95
    },
    {
        id: cuid(),
        name: "GRASSLAND_TEMPERATE",
        precipitationRange: [5, 50],
        precipitationMin: 5,
        precipitationMax: 50,
        temperatureRange: [-4, 22],
        temperatureMin: -4,
        temperatureMax: 22,
        solarModifier: 2,
        windModifier: 2,
        foodModifier: 2,
        waterModifier: 1,
        woodModifier: 1,
        stoneModifier: 1,
        oreModifier: 1,
        plotsRange: [1, 7],
        plotsMin: 1,
        plotsMax: 7,
        plotAreaRange: [50, 70],
        plotAreaMin: 50,
        plotAreaMax: 70
    },
    {
        id: cuid(),
        name: "DESERT_COLD",
        precipitationRange: [1, 50],
        precipitationMin: 1,
        precipitationMax: 50,
        temperatureRange: [-4, 22],
        temperatureMin: -4,
        temperatureMax: 22,
        solarModifier: 3,
        windModifier: 3,
        foodModifier: 1,
        waterModifier: 1,
        woodModifier: 1,
        stoneModifier: 2,
        oreModifier: 2,
        plotsRange: [0, 5],
        plotsMin: 0,
        plotsMax: 5,
        plotAreaRange: [50, 60],
        plotAreaMin: 50,
        plotAreaMax: 60
    },
    {
        id: cuid(),
        name: "DESERT_SUBTROPICAL",
        precipitationRange: [1, 100],
        precipitationMin: 1,
        precipitationMax: 100,
        temperatureRange: [18, 32],
        temperatureMin: 18,
        temperatureMax: 32,
        solarModifier: 4,
        windModifier: 4,
        foodModifier: 1,
        waterModifier: 1,
        woodModifier: 1,
        stoneModifier: 3,
        oreModifier: 3,
        plotsRange: [0, 5],
        plotsMin: 0,
        plotsMax: 5,
        plotAreaRange: [50, 70],
        plotAreaMin: 50,
        plotAreaMax: 70
    }
]

// const resources: Resource[] = [
//     {
//         id: cuid(),
//         name: "Solar",
//         description: "A measure of the amount of sunlight that reaches the plot. A higher value indicates that the plot is located in an area with more hours of sunlight, which can be useful for certain types of structures or activities.",
//         icon: ""
//     },
//     {
//         id: cuid(),
//         name: "Wind",
//         description: "A measure of the strength of the winds that pass over the plot. A higher value indicates that the plot is located in an area with stronger winds, which can be harnessed for energy or used for other purposes such as ventilation or transportation.",
//         icon: ""
//     },
//     {
//         id: cuid(),
//         name: "Food",
//         description: "Refers to any type of edible plant or animal resources that can be gathered, hunted, or grown within a settlement. Food is essential for keeping settlers alive and healthy.",
//         icon: ""
//     },
//     {
//         id: cuid(),
//         name: "Water",
//         description: "Refers to any source of fresh water within a settlement. Water is essential for the survival of settlers, as well as for farming and other activities.",
//         icon: ""
//     },
//     {
//         id: cuid(),
//         name: "Wood",
//         description: "Refers to any type of trees or woody plants that can be harvested within a settlement. Wood is a valuable resource for building structures, making tools, and fueling fires.",
//         icon: ""
//     },
//     {
//         id: cuid(),
//         name: "Stone",
//         description: "Refers to any type of rocks or minerals that can be mined within a settlement. Stone is a valuable resource for building structures and making tools.",
//         icon: ""
//     },
//     {
//         id: cuid(),
//         name: "Ore",
//         description: "Refers to any type of metallic or mineral resources that can be mined within a settlement. Ores are valuable resources for creating weapons, armor, and other advanced structures.",
//         icon: ""
//     }
// ]

const structures: Structure[] = [
    {
        id: cuid(),
        name: 'House',
        description: 'Provides living space for settlers, increases population capacity of the settlement.',
        image: `https://via.placeholder.com/128x128?text=House`,
    },
    {
        id: cuid(),
        name: 'Farm',
        description: 'Allows settlers to grow crops and produce food.',
        image: `https://via.placeholder.com/128x128?text=Farm`,
    },
    {
        id: cuid(),
        name: 'Well',
        description: 'Allows settlers to collect and store water',
        image: `https://via.placeholder.com/128x128?text=Well`
    },
    {
        id: cuid(),
        name:'Lumber Mill',
        description: 'Allows settlers to collect and store lumber',
        image: `https://via.placeholder.com/128x128?text=Lumber%20Mill`
    }
]

async function main() {
    console.log('Start seeding ...')

    // biomes, etc.
    console.log(`Seeding [${biomes.length}] Biomes`)
    biomes.forEach(async (biome) => {
        const resultBiome = await prisma.biome.upsert({
            where: {
                name: biome.name
            },
            create: biome,
            update: biome
        })

        console.log(`Biome ${resultBiome.name} with ID[${resultBiome.id}] created`)
    })

    console.log(`Seeding [${structures.length}] Structures`)
    structures.forEach(async (structure) => {
        const resultStructure = await prisma.structure.upsert({
            where: {
                id: structure.id
            },
            create: structure,
            update: structure
        })

        console.log(`Structure ${resultStructure.name} with ID[${resultStructure.id}] created`)
    })

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });