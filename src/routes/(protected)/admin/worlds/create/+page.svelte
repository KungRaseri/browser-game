<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import type { ActionData, PageData } from './$types';
	import type { Prisma, Region, Tile, World, Plot } from '@prisma/client';
	import { RangeSlider, Stepper, Step, ProgressRadial } from '@skeletonlabs/skeleton';

	import Information from 'svelte-material-icons-generator/svelte-material-icons/Information.svelte';
	import WorldComponent from '$lib/components/game/map/World.svelte';
	import type { ErrorResponse } from '$lib/types';

	export let data: PageData;

	const PREVIEW_STEP = 4;

	let world: World;
	let regions: Region[];
	let tiles: Tile[];
	let plots: Plot[];

	let errorResponse: ErrorResponse;

	let elevationOptions = {
		scale: 1,
		octaves: 8,
		amplitude: 1,
		frequency: 0.05,
		persistence: 0.5
	};

	let precipitationOptions = {
		scale: 1,
		octaves: 8,
		amplitude: 1,
		frequency: 0.05,
		persistence: 0.5
	};

	let temperatureOptions = {
		scale: 1,
		octaves: 8,
		amplitude: 1,
		frequency: 0.05,
		persistence: 0.5
	};

	let mapOptions = {
		serverId: data.servers[0].id,
		worldName: '',
		width: 100,
		height: 100,
		elevationSeed: Date.now(),
		precipitationSeed: Date.now(),
		temperatureSeed: Date.now()
	};

	let elevationSeed = Date.now();
	let precipitationSeed = Date.now() - 1;
	let temperatureSeed = Date.now() + 1;

	async function onCompleteHandler(e: Event): Promise<void> {
		const formData = new FormData();
		formData.set('world', new Blob([JSON.stringify(world)]));
		formData.set('regions', new Blob([JSON.stringify(regions)]));
		formData.set('tiles', new Blob([JSON.stringify(tiles)]));
		formData.set('plots', new Blob([JSON.stringify(plots)]));

		const response = await fetch('/api/world/save', {
			method: 'POST',
			body: formData
		});

		if (response) {
			const data = await response.json();
			if (data.result) {
				await goto('/admin/worlds');
			}

			if (typeof data === typeof errorResponse) {
				console.log('test');
			}
		}
	}

	function onNextHandler(e: Event): void {}

	function onBackHandler(e: Event): void {}

	async function onStepHandler(e: CustomEvent): Promise<void> {
		if (e.detail.state.current === PREVIEW_STEP) {
			const formData = new FormData();
			formData.set('MapOptions', JSON.stringify(mapOptions));
			formData.set('Biomes', JSON.stringify(data.biomes));
			formData.set('ElevationOptions', JSON.stringify(elevationOptions));
			formData.set('PrecipitationOptions', JSON.stringify(precipitationOptions));
			formData.set('TemperatureOptions', JSON.stringify(temperatureOptions));

			const response = await fetch('/api/world/preview', {
				method: 'POST',
				body: formData
			});

			const responseData = await response.json();

			({ world, regions, tiles, plots } = responseData);
		}
	}

	$: regions;
</script>

<div class="w-full h-full p-5 space-y-5">
	<div class="card p-3 rounded-md space-y-3">
		<h1 class="h1">New World</h1>
		<hr class="my-1" />
		<Stepper
			buttonNext="variant-ghost-primary"
			buttonComplete="variant-ghost-secondary"
			on:complete={onCompleteHandler}
			on:next={onNextHandler}
			on:step={onStepHandler}
			on:back={onBackHandler}
		>
			<Step locked={!mapOptions.worldName}>
				<svelte:fragment slot="header">
					<h2 class="h2">General</h2>
				</svelte:fragment>
				<div class="flex flex-col space-y-3">
					<label for="world-name" class="label">
						<span>World Name</span>
						<input
							id="world-name"
							name="world-name"
							type="text"
							class="input"
							bind:value={mapOptions.worldName}
							required
						/>
					</label>
					<label for="server-id" class="label">
						<span>Server ID</span>
						<select id="server-id" name="server-id" class="select" bind:value={mapOptions.serverId}>
							{#each data.servers as server, i}
								<option value={server.id}> {server.name}</option>
							{/each}
						</select>
					</label>
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header">
					<h2 class="h2">Elevation</h2>
				</svelte:fragment>
				<div class="flex flex-col space-y-3">
					<label for="elevation-seed" class="label">
						<span>Seed</span>
						<input
							id="elevation-seed"
							name="elevation-seed"
							type="number"
							class="input"
							bind:value={elevationSeed}
						/>
					</label>

					<RangeSlider
						id="elevation-octaves"
						name="elevation-octaves"
						label="elevation-octaves"
						step={1}
						min={1}
						max={16}
						ticked
						accent="accent-primary-500"
						bind:value={elevationOptions.octaves}
					>
						<span> Octaves </span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{elevationOptions.octaves}
						</span>
					</RangeSlider>

					<RangeSlider
						id="elevations-amplitude"
						name="elevations-amplitude"
						label="elevations-amplitude"
						step={0.1}
						min={1}
						max={5}
						ticked
						accent="accent-primary-500"
						bind:value={elevationOptions.amplitude}
					>
						<span> Amplitude </span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{elevationOptions.amplitude}
						</span>
					</RangeSlider>

					<RangeSlider
						id="elevation-frequency"
						name="elevation-frequency"
						label="elevation-frequency"
						step={0.01}
						min={0.01}
						max={1}
						ticked
						accent="accent-primary-500"
						bind:value={elevationOptions.frequency}
					>
						<span> Frequency </span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{elevationOptions.frequency}
						</span>
					</RangeSlider>

					<RangeSlider
						id="elevation-persistence"
						name="elevation-persistence"
						label="elevation-persistence"
						step={0.01}
						min={0.01}
						max={1}
						ticked
						accent="accent-primary-500"
						bind:value={elevationOptions.persistence}
					>
						<span> Persistence </span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{elevationOptions.persistence}
						</span>
					</RangeSlider>
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header">
					<h2 class="h2">Precipitation</h2>
				</svelte:fragment>
				<div class="flex flex-col space-y-3">
					<label for="precipitation-seed" class="label">
						<span>Seed</span>
						<input
							id="precipitation-seed"
							name="precipitation-seed"
							type="number"
							class="input"
							bind:value={precipitationSeed}
						/>
					</label>
					<RangeSlider
						id="precipitation-scale"
						name="precipitation-scale"
						label="precipitation-scale"
						step={0.01}
						min={0.01}
						max={1}
						ticked
						accent="accent-primary-500"
						bind:value={precipitationOptions.scale}
					>
						<span>Scale</span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{precipitationOptions.scale}
						</span>
					</RangeSlider>
					<RangeSlider
						id="precipitation-octaves"
						name="precipitation-octaves"
						label="precipitation-octaves"
						step={1}
						min={1}
						max={16}
						ticked
						accent="accent-primary-500"
						bind:value={precipitationOptions.octaves}
					>
						<span>Octaves</span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{precipitationOptions.octaves}
						</span>
					</RangeSlider>
					<RangeSlider
						id="precipitation-amplitude"
						name="precipitation-amplitude"
						label="precipitation-amplitude"
						step={0.1}
						min={1}
						max={5}
						ticked
						accent="accent-primary-500"
						bind:value={precipitationOptions.amplitude}
					>
						<span>Amplitude</span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{precipitationOptions.amplitude}
						</span>
					</RangeSlider>
					<RangeSlider
						id="precipitation-frequency"
						name="precipitation-frequency"
						label="precipitation-frequency"
						step={0.01}
						min={0.01}
						max={1}
						ticked
						accent="accent-primary-500"
						bind:value={precipitationOptions.frequency}
					>
						<span>Frequency</span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{precipitationOptions.frequency}
						</span>
					</RangeSlider>
					<RangeSlider
						id="precipitation-persistence"
						name="precipitation-persistence"
						label="precipitation-persistence"
						step={0.01}
						min={0.01}
						max={1}
						ticked
						accent="accent-primary-500"
						bind:value={precipitationOptions.persistence}
					>
						<span>Persistence</span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{precipitationOptions.persistence}
						</span>
					</RangeSlider>
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header">
					<h2 class="h2">Temperature</h2>
				</svelte:fragment>
				<div class="flex flex-col space-y-3">
					<label for="temperature-seed" class="label">
						<span>Seed</span>
						<input
							id="temperature-seed"
							name="temperature-seed"
							type="number"
							class="input"
							bind:value={temperatureSeed}
						/>
					</label>
					<RangeSlider
						id="temperature-scale"
						name="temperature-scale"
						label="temperature-scale"
						step={0.01}
						min={0.01}
						max={1}
						ticked
						accent="accent-primary-500"
						bind:value={temperatureOptions.scale}
					>
						<span>Scale</span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{temperatureOptions.scale}
						</span>
					</RangeSlider>
					<RangeSlider
						id="temperature-octaves"
						name="temperature-octaves"
						label="temperature-octaves"
						step={1}
						min={1}
						max={16}
						ticked
						accent="accent-primary-500"
						bind:value={temperatureOptions.octaves}
					>
						<span>Octaves</span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{temperatureOptions.octaves}
						</span>
					</RangeSlider>
					<RangeSlider
						id="temperature-amplitude"
						name="temperature-amplitude"
						label="temperature-amplitude"
						step={0.1}
						min={1}
						max={5}
						ticked
						accent="accent-primary-500"
						bind:value={temperatureOptions.amplitude}
					>
						<span>Amplitude</span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{temperatureOptions.amplitude}
						</span>
					</RangeSlider>
					<RangeSlider
						id="temperature-frequency"
						name="temperature-frequency"
						label="temperature-frequency"
						step={0.01}
						min={0.01}
						max={1}
						ticked
						accent="accent-primary-500"
						bind:value={temperatureOptions.frequency}
					>
						<span>Frequency</span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{temperatureOptions.frequency}
						</span>
					</RangeSlider>
					<RangeSlider
						id="temperature-persistence"
						name="temperature-persistence"
						label="temperature-persistence"
						step={0.01}
						min={0.01}
						max={1}
						ticked
						accent="accent-primary-500"
						bind:value={temperatureOptions.persistence}
					>
						<span>Persistence</span>
						<span class="rounded-md bg-surface-backdrop-token py-0.5 px-1">
							{temperatureOptions.persistence}
						</span>
					</RangeSlider>
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
			</Step>
		</Stepper>

		<div class="bg-surface-50 w-5/6 mx-auto">
			{#if !regions}
				<div class="flex flex-col space-y-3">
					<div class="placeholder animate-pulse rounded-none" />
				</div>
			{:else}
				<WorldComponent {world} {regions} {tiles} biomes={data.biomes} />
			{/if}
		</div>
	</div>
</div>
