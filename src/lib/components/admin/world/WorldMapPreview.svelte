<script lang="ts">
	import type { Prisma } from '@prisma/client';
	import RegionComponent from '$lib/components/game/map/Region.svelte';

	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	let tileDetailsPopupSettings: PopupSettings = {
		event: 'hover',
		target: 'tileDetails',
		placement: 'bottom'
	};

	export let regions: Prisma.RegionGetPayload<{
		include: {
			tiles: { include: { Biome: true } };
		};
	}>[];
</script>

<div class="grid grid-cols-10">
	{#each regions as region}
		<div class="grid grid-cols-10">
			{#each region.tiles as tile}
				<div class="w-4 h-4 text-xs text-center">
					<button use:popup={tileDetailsPopupSettings}>
						{tile.id.substring(tile.id.length - 3, tile.id.length)}
					</button>
				</div>
			{/each}
		</div>
	{/each}
</div>

<div class="card variant-filled-secondary p-4" data-popup="tileDetails">test</div>
