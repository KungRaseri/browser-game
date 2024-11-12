<script lang="ts">
	import { TileType } from '@prisma/client';
	import type { Biome, World, Region, Tile, Plot, Prisma } from '@prisma/client';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { fail } from '@sveltejs/kit';

	export let world: World;
	export let regions: Region[];
	export let tiles: Tile[];
	export let biomes: Biome[];

	function backgroundFromElevation(tile: Tile) {
		switch (tile.type) {
			case 'LAND':
				return 'bg-amber-200';
			default:
				if (tile.elevation < -0.39) return 'bg-blue-900';
				if (tile.elevation >= -0.39 && tile.elevation < -0.2) return 'bg-blue-800';
				if (tile.elevation >= -0.2 && tile.elevation < -0.15) return 'bg-blue-700';
				if (tile.elevation >= -0.15 && tile.elevation < -0.098) return 'bg-blue-600';

				return 'bg-blue-500';
		}
	}

	function backgroundFromBiomeAndElevation(tile: Tile) {
		if (tile.type === TileType.OCEAN) return;
		if (tile.elevation > 0 && tile.elevation <= 0.0775) return;
		if (tile.elevation > 0.3 && tile.elevation < 0.45) return 'bg-slate-700';
		if (tile.elevation >= 0.45) return 'bg-slate-200';

		const biome = biomes.find((b) => b.id === tile.biomeId);

		if (!biome) {
			throw fail(400, { message: 'Invalid biomeId provided' });
		}

		switch (biome.name) {
			case 'TUNDRA':
				return 'bg-blue-200';
			case 'FOREST_BOREAL':
				return 'bg-teal-700';
			case 'FOREST_TEMPERATE_SEASONAL':
				return 'bg-lime-700';
			case 'FOREST_TROPICAL_SEASONAL':
				return 'bg-green-700';
			case 'RAINFOREST_TEMPERATE':
				return 'bg-emerald-800';
			case 'RAINFOREST_TROPICAL':
				return 'bg-emerald-700';
			case 'WOODLAND':
				return 'bg-lime-950';
			case 'SHRUBLAND':
				return 'bg-emerald-950';
			case 'SAVANNA':
				return 'bg-yellow-600';
			case 'GRASSLAND_TEMPERATE':
				return 'bg-lime-500';
			case 'DESERT_COLD':
				return 'bg-orange-200';
			case 'DESERT_SUBTROPICAL':
				return 'bg-orange-400';
			default:
				return 'bg-blue-100';
		}
	}
</script>

<div class="card p-4">
	<section>
		{world.name}
	</section>
</div>
<div class="grid grid-cols-10">
	{#each regions as region}
		<button
			type="button"
			class="block aspect-square [&>*]:pointer-events-none"
			use:popup={{ event: 'hover', placement: 'bottom', target: `regionDetails-${region.id}` }}
		>
			<div class="grid grid-cols-10">
				{#each tiles.filter((t) => t.regionId === region.id) as tile}
					<div
						class="block aspect-square
							{backgroundFromBiomeAndElevation(tile)} 
							{backgroundFromElevation(tile)}"
					/>
				{/each}
			</div>
		</button>

		<div
			class="card p-4 rounded-sm"
			aria-labelledby="region-details-button-{region.id}"
			data-popup="regionDetails-{region.id}"
		>
			<h2 class="h2">Region: {region.id} [{region.name}]</h2>
		</div>
	{/each}
</div>
