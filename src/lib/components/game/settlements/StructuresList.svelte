<script lang="ts">
	import type { Prisma, Structure, SettlementStructure } from '@prisma/client';
	import StructureComponent from './Structure.svelte';

	export let settlementStructures: SettlementStructure[];

	export let structures: Structure[];
</script>

<dl class="list-dl p-4">
	{#each structures as structure}
		<StructureComponent {structure} {settlementStructures} />
	{/each}
</dl>
