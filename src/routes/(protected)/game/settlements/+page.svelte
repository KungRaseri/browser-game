<script lang="ts">
	import SettlementsList from '$lib/components/game/settlements/SettlementsList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="p-3">
	<SettlementsList settlementsData={data.settlements} />
</section>
