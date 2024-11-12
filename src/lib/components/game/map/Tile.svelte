<script lang="ts">
	import { TileType } from '@prisma/client';
	import type { Prisma, Tile, Biome, Plot } from '@prisma/client';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { fail } from '@sveltejs/kit';

	export let tile: Prisma.TileGetPayload<{
		include: {
			Biome: true;
			Plots: true;
		};
	}>;
	export let biomes: Biome[];

	function backgroundFromElevation() {
		switch (tile.type) {
			case 'LAND':
				return 'bg-amber-200';
			default:
				if (tile.elevation < -0.5) return 'bg-blue-900';
				if (tile.elevation >= -0.5 && tile.elevation < -0.4) return 'bg-blue-800';
				if (tile.elevation >= -0.4 && tile.elevation < -0.3) return 'bg-blue-700';
				if (tile.elevation >= -0.3 && tile.elevation < -0.075) return 'bg-blue-600';

				return 'bg-blue-500';
		}
	}

	function backgroundFromBiomeAndElevation() {
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

	const MenuOptions: PopupSettings = {
		event: 'hover',
		target: 'tileDetails',
		placement: 'top'
	};
</script>

<button
	type="button"
	class="block aspect-square [&>*]:pointer-events-none
	{backgroundFromBiomeAndElevation()} 
	{backgroundFromElevation()}"
	id="tile-details-button"
	aria-expanded="false"
	aria-haspopup="true"
	use:popup={MenuOptions}
/>

<div class="card p-4" aria-labelledby="tile-details-button" data-popup="tileDetails">
	<p>hover content</p>
</div>
