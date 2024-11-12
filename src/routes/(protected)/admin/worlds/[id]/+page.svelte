<script lang="ts">
	import WorldComponent from '$lib/components/game/map/World.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ol class="breadcrumb m-1">
	<li class="crumb"><a href="/admin/">Dashboard</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/admin/servers/{data.world.serverId}/">Server</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>{data.world.name} [{data.world.id}]</li>
</ol>

<div class="card p-5 m-5">
	<header>
		<h1 class="h1">{data.world.name}</h1>
		<div class="px-5">
			<p>Land: {data.worldInfo.landTiles}</p>
			<p>Ocean: {data.worldInfo.oceanTiles}</p>
			<p>Settlements: {data.worldInfo.settlements}</p>
		</div>
	</header>
	<hr class="my-3" />
	<section class="p-4 w-5/6 mx-auto">
		<WorldComponent
			world={data.world}
			regions={data.regions}
			tiles={data.tiles}
			biomes={data.biomes}
			plots={data.plots}
		/>
	</section>
</div>
