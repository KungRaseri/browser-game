<script lang="ts">
	import WorldComponent from '$lib/components/game/map/World.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="bg-surface-50 w-5/6 mx-auto">
	<WorldComponent
		world={data.world}
		regions={data.regions}
		tiles={data.tiles}
		biomes={data.biomes}
	/>
</div>
