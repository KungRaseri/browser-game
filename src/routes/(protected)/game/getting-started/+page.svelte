<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import Campfire from 'svelte-material-icons-generator/svelte-material-icons/Campfire.svelte';
	import Information from 'svelte-material-icons-generator/svelte-material-icons/Information.svelte';

	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	import type { Profile, Server, World } from '@prisma/client';

	import type { ErrorResponse } from '$lib/types';
	let errorResponse: ErrorResponse;

	export let data: PageData;

	let selectedServer: Server;
	let selectedWorld: World;
	let profile: Profile = {
		id: '',
		accountId: data.account.id,
		picture: '',
		username: ''
	};

	async function onCompleteHandler(e: Event): Promise<void> {
		const formData = new FormData();
		formData.set('server', new Blob([JSON.stringify(selectedServer)]));
		formData.set('world', new Blob([JSON.stringify(selectedWorld)]));
		formData.set('profile', new Blob([JSON.stringify(profile)]));

		const response = await fetch('/api/game/settle', {
			method: 'POST',
			body: formData
		});

		if (response) {
			const data = await response.json();
			console.log(data)
			if (data.result) {
				await goto('/game');
			}

			if (typeof data === typeof errorResponse) {
				console.log('test');
			}
		}
	}

	function onStepHandler(e: Event): void {
		console.log('event:step', e);
	}

	function onNextHandler(e: Event): void {
		console.log('event:next', e);
	}

	function onBackHandler(e: Event): void {
		console.log('event:back', e);
	}
</script>

<div class="w-full h-full p-5 space-y-5">
	<div class="card p-3 rounded-md space-y-3">
		<h1 class="h1">Getting Started</h1>
		<hr class="my-1" />
		<Stepper
			buttonNext="variant-ghost-primary"
			buttonComplete="variant-ghost-secondary"
			on:complete={onCompleteHandler}
			on:next={onNextHandler}
			on:step={onStepHandler}
			on:back={onBackHandler}
		>
			<Step locked={!selectedServer}>
				<svelte:fragment slot="header">
					<h2 class="h2">Server</h2>
				</svelte:fragment>
				<div class="flex flex-col space-y-3">
					<label for="server" class="label">
						<select id="server" name="server" class="select" bind:value={selectedServer}>
							{#each data.servers as server, i}
								<option value={server}> {server.name} [{server.id}]</option>
							{/each}
						</select>
					</label>
				</div>
			</Step>
			<Step locked={!selectedWorld}>
				<svelte:fragment slot="header">
					<h2 class="h2">World</h2>
				</svelte:fragment>
				<div class="flex flex-col space-y-3">
					<label for="world" class="label">
						<select id="world" name="world" class="select" bind:value={selectedWorld}>
							{#each data.worlds as world, i}
								<option value={world}> {world.name} [{world.id}]</option>
							{/each}
						</select>
					</label>
				</div>
			</Step>

			<Step locked={!profile.username}>
				<svelte:fragment slot="header">
					<h2 class="h2">Profile</h2>
				</svelte:fragment>
				<div class="flex flex-col space-y-3">
					<input type="hidden" id="account-id" name="account-id" bind:value={data.account.id} />
					<label for="profile-username" class="label">
						<span>Username</span>
						<input
							type="text"
							id="profile-username"
							name="profile-username"
							class="input"
							bind:value={profile.username}
						/>
					</label>
				</div>
			</Step>

			<Step>
				<svelte:fragment slot="header">
					<h2 class="h2">Preview</h2>
				</svelte:fragment>

				{#if errorResponse?.invalid}
					<div class="alert variant-ghost-error w-11/12 mx-auto m-5">
						<div class="alert-message"><Information />{errorResponse.message}</div>
					</div>
				{/if}

				<section class="card">
					<h3 class="card-header">General</h3>
					<div class="p-4">
						<ul>
							<li>Server ID: {selectedServer.name} [{selectedServer.id}]</li>
							<li>World ID: {selectedWorld.name} [{selectedWorld.id}]</li>
						</ul>
						<section class="card m-1">
							<h4 class="card-header">Profile</h4>
							<div class="p-4">
								<ul>
									<li>
										Account ID: {data.account.id}
									</li>
									<li>
										Username: {profile.username}
									</li>
								</ul>
							</div>
						</section>
					</div>
				</section>
			</Step>
		</Stepper>
	</div>
</div>
