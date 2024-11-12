<script lang="ts">
	import type { Settlement, Prisma } from '@prisma/client';
	import { Datatable, DataHandler, Th } from '@vincjo/datatables';

	export let settlementsData: Prisma.SettlementGetPayload<{
		include: {
			Structures: true;
			Resources: true;
			Plot: true;
		};
	}>[];

	export let tableConfig = {
		rowsPerPage: 20
	};

	const settlementsDataHandler = new DataHandler(settlementsData, {
		rowsPerPage: tableConfig.rowsPerPage
	});
	const settlements = settlementsDataHandler.getRows();
</script>

<Datatable
	handler={settlementsDataHandler}
	search={false}
	rowCount={false}
	pagination={false}
	rowsPerPage={false}
>
	<table aria-describedby="settlements-header" class="table table-hover">
		<thead>
			<tr>
				<Th handler={settlementsDataHandler} orderBy="id">ID</Th>
				<Th handler={settlementsDataHandler} orderBy="name">Name</Th>
				<Th handler={settlementsDataHandler} orderBy="resourcesId">Resources</Th>
				<Th handler={settlementsDataHandler} orderBy="plotId">Plot</Th>
			</tr>
		</thead>
		<tbody>
			{#if $settlements}
				{#each $settlements as settlement}
					<tr>
						<td><a href="/game/settlements/{settlement.id}">{settlement.id}</a></td>
						<td>{settlement.name}</td>
						<td>
							<span class="badge variant-filled-surface">
								Food: {settlement.Resources?.food}
							</span>
							<span class="badge variant-filled-surface">
								Water: {settlement.Resources?.water}
							</span>
							<span class="badge variant-filled-surface">
								Wood: {settlement.Resources?.wood}
							</span>
							<span class="badge variant-filled-surface">
								Stone: {settlement.Resources?.stone}
							</span>
							<span class="badge variant-filled-surface">
								Ore: {settlement.Resources?.ore}
							</span>
						</td>
						<td>
							<span class="badge variant-filled-surface">Area: {settlement.Plot.area}</span>
							<span class="badge variant-filled-surface">Solar: {settlement.Plot.solar}</span>
							<span class="badge variant-filled-surface">Wind: {settlement.Plot.wind}</span>
							<span class="badge variant-filled-surface">Water: {settlement.Plot.water}</span>
							<span class="badge variant-filled-surface">Food: {settlement.Plot.food}</span>
							<span class="badge variant-filled-surface">Wood: {settlement.Plot.wood}</span>
							<span class="badge variant-filled-surface">Stone: {settlement.Plot.stone}</span>
							<span class="badge variant-filled-surface">Ore: {settlement.Plot.ore}</span>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</Datatable>
