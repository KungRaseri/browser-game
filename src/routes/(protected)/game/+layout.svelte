<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import GameNavigation from '$lib/components/game/Navigation.svelte';
	import GameFooter from '$lib/components/game/Footer.svelte';
	import { onMount } from 'svelte';

	let serverTime: string = '...';
	let localTime: string = '...';

	function updateServerTime(time: string) {
		serverTime = time;
	}

	function updateLocalTime(time: string) {
		localTime = time;
	}

	onMount(() => {
		updateServerTime(new Date().getTime().toString());
		updateLocalTime(new Date().getTime().toString());
	});

	$: serverTime;
	$: localTime;

	export let data: PageData;
</script>

<svelte:head>
	<title>Game | Uncharted Lands</title>
</svelte:head>

<AppShell slotPageHeader="z-10">
	<svelte:fragment slot="pageHeader">
		{#if data.account.profile}
			<GameNavigation />
		{/if}
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
		{#if data.account.profile}
			<GameFooter />
		{/if}
	</svelte:fragment>
</AppShell>
