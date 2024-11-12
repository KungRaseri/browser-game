<script lang="ts">
	import type { Prisma, Tile } from '@prisma/client';
	import ElevationRise from 'svelte-material-icons-generator/svelte-material-icons/ElevationRise.svelte';
	import Earth from 'svelte-material-icons-generator/svelte-material-icons/Earth.svelte';
	import WeatherPouring from 'svelte-material-icons-generator/svelte-material-icons/WeatherPouring.svelte';
	import ThermometerLines from 'svelte-material-icons-generator/svelte-material-icons/ThermometerLines.svelte';

	export let tile: Prisma.TileGetPayload<{ include: { Biome: true } }>;
</script>

<div class="card">
	<header class="card-header"><h2>Tile Details</h2></header>
	<section class="p-4">
		<ul class="list">
			<li class="list-item">
				<span><Earth size="24" /></span>
				<span class="flex-auto">Biome: {tile.Biome.name}</span>
			</li>
			<li class="list-item">
				<span><ElevationRise size={24} /></span>
				<span class="flex-auto">
					Elevation: {(tile.elevation * 10000).toPrecision(8)} ({tile.elevation})
				</span>
			</li>
			<li class="list-item">
				<span><WeatherPouring size={24} /></span>
				<span class="flex-auto">
					Precipitation: {tile.precipitation.toPrecision(5)} ({tile.precipitation})
				</span>
			</li>
			<li class="list-item">
				<span><ThermometerLines size={24} /></span>
				<span class="flex-auto">
					Temperature: {tile.temperature.toPrecision(4)} ({tile.temperature})
				</span>
			</li>
		</ul>
	</section>
</div>
