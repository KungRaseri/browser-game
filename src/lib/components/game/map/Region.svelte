<script lang="ts">
	import type { Region, Tile, Biome, Plot, Prisma } from '@prisma/client';
	import TileComponent from './Tile.svelte';

	export let region: Prisma.RegionGetPayload<{
		include: {
			tiles: {
				include: {
					Biome: true;
					Plots: true;
				};
			};
		};
	}>;
	export let biomes: Biome[];
</script>

<div class="grid grid-cols-10">
	{#each region.tiles as tile}
		<TileComponent {tile} {biomes} />
	{/each}
</div>
