<script lang="ts">
	import type { Prisma, World, Region, Tile, Plot } from '@prisma/client';
	import WorldComponent from '$lib/components/game/map/World.svelte';

	export let world: World;
	export let regions: Region[];
	export let tiles: Tile[];
	export let plots: Plot[];

	export let worldInfo: { landTiles: number; oceanTiles: number; settlements: number };
</script>

<div class="card">
	<header class="card-header flex space-x-3">
		<h2>{world.name} {`<${world.id}>`}</h2>
	</header>

	<hr class="m-2" />

	<section class="p-4">
		<h2>Details</h2>
		<hr class="m-2" />

		<div class="card">
			<section class="p-4">
				{worldInfo.landTiles}
				{worldInfo.oceanTiles}
				{worldInfo.settlements}
			</section>
		</div>

		<h2>Map</h2>

		<hr class="m-2" />

		{#if regions}
			<WorldComponent regions={world.regions} />
		{/if}
	</section>
</div>
