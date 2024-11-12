<script lang="ts">
	import type { Prisma, Settlement } from '@prisma/client';
	import ElevationRise from 'svelte-material-icons-generator/svelte-material-icons/ElevationRise.svelte';
	import Earth from 'svelte-material-icons-generator/svelte-material-icons/Earth.svelte';
	import WeatherPouring from 'svelte-material-icons-generator/svelte-material-icons/WeatherPouring.svelte';
	import ThermometerLines from 'svelte-material-icons-generator/svelte-material-icons/ThermometerLines.svelte';

	export let settlement: Prisma.SettlementGetPayload<{
		include: {
			PlayerProfile: {
				include: {
					profile: true;
				};
			};
			Storage: true;
			Structures: true;
		};
	}>;
</script>

<div class="card">
	<header class="card-header">
		<h3>Settlement Details {`[${settlement.id}]`}</h3>
	</header>
	<section class="p-4">
		{settlement.PlayerProfile.profile.username}
		{settlement.name}
		{#each settlement.Structures as structure}
			{structure.name}
		{/each}
	</section>
	<footer class="card-footer">
		<span class="badge bg-secondary-700-200-token text-secondary-200-700-token">
			Food Storage: {settlement.Storage.food}
		</span>
		<span class="badge bg-secondary-700-200-token text-secondary-200-700-token">
			Water Storage: {settlement.Storage.water}
		</span>
		<span class="badge bg-secondary-700-200-token text-secondary-200-700-token">
			Wood Storage: {settlement.Storage.wood}
		</span>
		<span class="badge bg-secondary-700-200-token text-secondary-200-700-token">
			Stone Storage: {settlement.Storage.stone}
		</span>
		<span class="badge bg-secondary-700-200-token text-secondary-200-700-token">
			Ore Storage: {settlement.Storage.ore}
		</span>
	</footer>
</div>
