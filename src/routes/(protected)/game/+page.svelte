<script lang="ts">
	import type { PageData } from './$types';
	import SettlementsList from '$lib/components/game/settlements/SettlementsList.svelte';

	export let data: PageData;
</script>

<div class="card p-4 m-5">
	<header class="card-header"><h1>Overview</h1></header>
	<hr class="divide m-1" />
	<section class="p-2">
		<div class="card p-4 my-1">
			<header><h2>Settlements</h2></header>
			<SettlementsList settlementsData={data.settlements} />
		</div>
	</section>
</div>
