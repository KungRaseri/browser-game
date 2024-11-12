<script lang="ts">
	import type { SettlementStructure, Structure } from '@prisma/client';

	export let structure: Structure;
	export let settlementStructures: SettlementStructure[];

	$: hasBuiltStructure = (id: string) =>
		settlementStructures.find((ss) => ss.structureId == id) != undefined;
</script>

<div>
	<img class="btn-icon rounded-full" src={structure.image} alt={structure.name} />
	<span class="flex-auto">
		<dl>
			<dt>{structure.name}</dt>
			<dd>{structure.description}</dd>
		</dl>
	</span>
	<span class="badge variant-soft-tertiary">
		{settlementStructures.find((ss) => ss.structureId == structure.id)?.level ?? 0}
	</span>
	<div class="btn-group">
		<button class="btn-icon-sm variant-soft-success rounded-full mx-0">+</button>
		<button
			class="btn-icon-sm rounded-full"
			class:variant-glass-error={hasBuiltStructure(structure.id)}
			disabled={!hasBuiltStructure(structure.id)}>-</button
		>
	</div>
</div>
<hr />
