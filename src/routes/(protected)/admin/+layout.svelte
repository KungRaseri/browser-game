<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import Navigation from '$lib/components/admin/Navigation.svelte';
</script>

<svelte:head>
	<title>Administration | Uncharted Lands</title>
</svelte:head>

<AppShell slotPageContent="overflow-scroll">
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
</AppShell>
