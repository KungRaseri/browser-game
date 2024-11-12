<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';

	import ViewDashboard from 'svelte-material-icons-generator/svelte-material-icons/ViewDashboard.svelte';
	import Server from 'svelte-material-icons-generator/svelte-material-icons/Server.svelte';
	import Web from 'svelte-material-icons-generator/svelte-material-icons/Web.svelte';
	import AccountGroup from 'svelte-material-icons-generator/svelte-material-icons/AccountGroup.svelte';
	import FolderSearchOutline from 'svelte-material-icons-generator/svelte-material-icons/FolderSearchOutline.svelte';
	import Github from 'svelte-material-icons-generator/svelte-material-icons/Github.svelte';

	let railTiles: Array<any> = [
		{
			label: 'Servers',
			title: 'Servers',
			href: '/admin/servers',
			value: '/admin/servers',
			icon: Server
		},
		{
			label: 'Worlds',
			title: 'Worlds',
			href: '/admin/worlds',
			value: '/admin/worlds',
			icon: Web
		},
		{
			label: 'Accounts',
			title: 'Accounts',
			href: '/admin/accounts',
			value: '/admin/accounts',
			icon: AccountGroup
		},
		{
			label: 'Reports',
			title: 'Reports',
			href: '/admin/reports',
			value: '/admin/reports',
			icon: FolderSearchOutline
		}
	];

	$: isActive = (href: string) => href === $page.url.pathname;

	const storeValue: Writable<number> = writable(1);
</script>

<AppRail selected={storeValue}>
	<svelte:fragment slot="lead">
		<div class:bg-primary-active-token={isActive('/admin')} class="p-1">
			<AppRailAnchor title="Dashboard" href="/admin">
				<svelte:fragment slot="lead"><ViewDashboard width="100%" size={36} /></svelte:fragment>
				<span class="text-xs">Dashboard</span>
			</AppRailAnchor>
		</div>
	</svelte:fragment>
	{#each railTiles as railTile}
		<div class:bg-primary-active-token={isActive(railTile.href)}>
			<AppRailAnchor title={railTile.title} href={railTile.href}>
				<svelte:fragment slot="lead">
					<svelte:component this={railTile.icon} size={36} />
				</svelte:fragment>
				<span class="text-xs">{railTile.label}</span>
			</AppRailAnchor>
		</div>
	{/each}
	<svelte:fragment slot="trail">
		<AppRailAnchor
			href="https://github.com/RedSyndicate/uncharted-lands"
			target="_blank"
			title="Github"
		>
			<svelte:fragment slot="lead"><Github width="100%" size={36} /></svelte:fragment>
			<span class="text-xs">Github</span>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>
