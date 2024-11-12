<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="card p-4">
	<header class="card-header flex space-x-3">
		<h1 class="text-xl">{data.server.name}</h1>
		<span
			class="badge {data.server.status === 'ONLINE'
				? 'variant-ghost-success'
				: 'variant-ghost-error'}"
		>
			{data.server.status}
		</span>
	</header>

	<hr class="m-2" />

	<!-- worlds -->
	<div class="p-4 grid grid-cols-6">
		{#each data.server.worlds as world}
			<div class="card p-4">
				<header class="card-header">
					<h2 class="text-2xl">
						<a href="/admin/worlds/{world.id}/">{world.name}</a>
					</h2>
					<span class="text-xs py-2 text-token">{world.id}</span>
				</header>
				<hr class="m-2" />
				<div class="p-4 grid grid-cols-1">
					<div>Created At: {world.createdAt.toDateString()}</div>
					<div>Updated At: {world.updatedAt.toDateString()}</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- players -->
	<!-- <div class="p-4 grid grid-cols-6">
		{#each data.server.players as player}
			<div class="card p-4">
				<div class="p-4">
					<Avatar src={player.profile.picture} />
				</div>
				<header class="card-header">
					<h2 class="text-2xl">
						<a href="/admin/accounts/{player.profile.accountId}/">{player.profile.username}</a>
					</h2>
					<span class="text-xs py-2 text-token">{player.profileId}</span>
				</header>
				<hr class="m-2" />
			</div>
		{/each}
	</div> -->
</div>
