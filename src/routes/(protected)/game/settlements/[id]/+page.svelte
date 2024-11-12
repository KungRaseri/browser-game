<script lang="ts">
	import StructuresList from '$lib/components/game/settlements/StructuresList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="card p-2 m-5">
	<header class="card-header">
		<h2>
			{data.settlement.name} <span class="text-xs align-middle">{`<${data.settlement.id}>`}</span>
		</h2>
	</header>

	<div class="p-4 space-y-5">
		<div class="flex justify-evenly">
			<div class="card">
				<header class="card-header">
					<h3>Plot</h3>
					<span class="text-xs align-middle">{`<${data.settlement.Plot.id}>`}</span>
				</header>

				<hr class="my-2" />
				<section class="p-4">
					<div class="badge variant-ghost-secondary">
						Area: {data.settlement.Plot.area}
					</div>
					<div class="badge variant-ghost-secondary">
						Solar: {data.settlement.Plot.solar}
					</div>
					<div class="badge variant-ghost-secondary">
						Wind: {data.settlement.Plot.wind}
					</div>
					<div class="badge variant-ghost-secondary">
						Food: {data.settlement.Plot.food}
					</div>
					<div class="badge variant-ghost-secondary">
						Water: {data.settlement.Plot.water}
					</div>
					<div class="badge variant-ghost-secondary">
						Wood: {data.settlement.Plot.wood}
					</div>
					<div class="badge variant-ghost-secondary">
						Stone: {data.settlement.Plot.stone}
					</div>
					<div class="badge variant-ghost-secondary">
						Ore: {data.settlement.Plot.ore}
					</div>
				</section>

				<footer class="card-footer" />
			</div>
			<div class="card">
				<header class="card-header">
					<h3>Resources</h3>
					<span class="text-xs">{`<${data.settlement.Resources?.id}>`}</span>
				</header>

				<hr class="my-2" />
				<section class="p-4">
					<div class="badge variant-ghost-secondary">
						Food: {data.settlement.Resources?.food}
					</div>
					<div class="badge variant-ghost-secondary">
						Water: {data.settlement.Resources?.water}
					</div>
					<div class="badge variant-ghost-secondary">
						Wood: {data.settlement.Resources?.wood}
					</div>
					<div class="badge variant-ghost-secondary">
						Stone: {data.settlement.Resources?.stone}
					</div>
					<div class="badge variant-ghost-secondary">
						Ore: {data.settlement.Resources?.ore}
					</div>
				</section>
			</div>
		</div>
		<div class="card">
			<header class="card-header">
				<h3>Structures</h3>
			</header>
			<StructuresList settlementStructures={data.settlement.Structures} structures={data.structures} />
		</div>
	</div>
</div>
