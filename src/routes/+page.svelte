<script lang="ts">
	import { page } from '$app/stores';

	import { ListBox, ListBoxItem, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';

	import Discord from 'svelte-material-icons-generator/svelte-material-icons/Discord.svelte';
	import Github from 'svelte-material-icons-generator/svelte-material-icons/Github.svelte';
	import Twitter from 'svelte-material-icons-generator/svelte-material-icons/Twitter.svelte';
	import Earth from 'svelte-material-icons-generator/svelte-material-icons/Earth.svelte';
	import Campfire from 'svelte-material-icons-generator/svelte-material-icons/Campfire.svelte';

	let featureListSelection: string = 'Survival';
	let tabSet: number = 0;

	const featureImages = [
		{
			title: 'Survival',
			content:
				'Welcome to Uncharted Lands, where you must settle in a harsh and unforgiving land. Gather resources, build shelter, and survive the dangers that await you.',
			image: {
				src: 'https://via.placeholder.com/1280x720?text=Survival',
				alt: 'settlers feature survival'
			}
		},
		{
			title: 'Expansion',
			content:
				'Explore, expand and establish your settlements across uncharted territories as you make a name for yourself in a vast and unknown world.',
			image: {
				src: 'https://via.placeholder.com/1280x720?text=Expansion',
				alt: 'settlers feature expansion'
			}
		},
		{
			title: 'Trade',
			content:
				'In Uncharted Lands, trade is the lifeblood of society. Seek out valuable resources and forge relationships with other settlements to build a thriving economy.',
			image: {
				src: 'https://via.placeholder.com/1280x720?text=Trade',
				alt: 'settlers feature trade'
			}
		}
	];
</script>

<svelte:head>
	<title>Portal | Uncharted Lands</title>
</svelte:head>

<header id="hero" class="hero-gradient">
	<div class="hero-bg flex flex-col min-w-7xl">
		<div class="p-4 flex flex-col items-center text-center space-y-10">
			<Earth size="96" />
			<h1 class="h1">Uncharted Lands</h1>
			<p class="!text-xl max-w-3xl">
				Explore the vast uncharted wilderness, discover new biomes and terrains, and thrive in the
				face of adversity. Trade with other players for a variety of goods. Expand your settlements
				across the land, build new structures, and create a thriving community.
			</p>
			<p class="!text-xl max-w-2xl">
				Will you be able to conquer the wilderness and thrive in Uncharted Lands?
			</p>

			<div class="flex gap-4">
				{#if !$page.data.account}
					<a href="/register" class="btn variant-filled-primary">
						<span>Get Settled</span>
						<Campfire />
					</a>
				{:else}
					<a href="/game/getting-started" class="btn variant-ghost-secondary">
						<span>Get Settled</span>
						<Campfire />
					</a>
				{/if}
				<a href="/wiki/introduction" class="btn variant-soft-primary">Learn More</a>
			</div>
		</div>
	</div>
</header>

<div
	class="my-20 p-6 max-w-4xl mx-auto text-center flex justify-center items-center gap-5 variant-glass-secondary rounded-none lg:rounded-2xl"
>
	{#if !$page.data.account}
		<p>Already have an account?</p>
		<a href="sign-in" class="btn btn-sm variant-ghost-secondary">Sign In</a>
	{:else}
		<p>Ready to get started?</p>
		<a href="/game/getting-started" class="btn btn-sm variant-ghost-secondary">Settle Now</a>
	{/if}
</div>

<section class="my-20 feature-gradient max-w-6xl mx-auto p-10 rounded-none xl:rounded-3xl">
	<div class="grid grid-cols-1 lg:grid-cols-2 m-5 mx-auto">
		<TabGroup
			justify="justify-center lg:justify-end"
			active="variant-filled-primary"
			hover="bg-surface-100-800-token hover:bg-surface-300-600-token"
			flex="flex"
			class="variant-glass-surface rounded-t-2xl lg:rounded-2xl lg:rounded-r-none sm:max-w-xl lg:max-w-full mx-auto"
		>
			{#each featureImages as image, i}
				<Tab bind:group={tabSet} name="feature-tabs-{image.title.toLowerCase()}" value={i}>
					{image.title}
				</Tab>
			{/each}

			<svelte:fragment slot="panel">
				<p class="p-4 text-center lg:text-right">
					{featureImages[tabSet].content}
				</p>
			</svelte:fragment>
		</TabGroup>

		<div class="mx-auto">
			<img
				src={featureImages[tabSet].image.src}
				alt={featureImages[tabSet].image.alt}
				class="rounded-b-2xl lg:rounded-2xl lg:rounded-l-none shadow-lg aspect-[16/9] sm:max-w-xl lg:max-w-full"
				transition:fade|global
			/>
		</div>
	</div>
</section>

<footer class="mt-10 flex-none">
	<div
		class="footer-gradient bg-surface-50-900-token border-t border-surface-500/10 text-xs md:text-base"
	>
		<div class="w-full max-w-7xl mx-auto p-4 py-16 md:py-24 space-y-10">
			<section
				class="flex flex-col md:flex-row justify-between items-center md:items-start space-y-5 md:space-y-0"
			>
				<div
					class="grid grid-cols-1 gap-2 place-content-center place-items-center md:place-items-start"
				>
					<Earth size="36" />
					<p>Browser-based settlement game.</p>
					<span class="badge variant-soft">v0.0.1</span>
				</div>
				<div class="hidden md:grid grid-cols-3 gap-8">
					<div class="space-y-6">
						<h6>Explore</h6>
						<ul class="space-y-3">
							<li><a class="anchor" href="/wiki">Wiki</a></li>
							<li><a class="anchor" href="/game">Game</a></li>
							<li><a class="anchor" href="/forum">Forum</a></li>
						</ul>
					</div>
					<div class="space-y-6">
						<h6>Learn</h6>
						<ul class="space-y-3">
							<li><a class="anchor" href="/wiki/introduction">Introduction</a></li>
							<li><a class="anchor" href="/wiki/getting-started">Getting Started</a></li>
							<li><a class="anchor" href="/wiki/features">Features</a></li>
						</ul>
					</div>
					<div class="space-y-6">
						<h6>Project</h6>
						<ul class="space-y-3">
							<li>
								<a
									href="https://github.com/redsyndicate"
									target="_blank"
									rel="noreferrer"
									class="anchor"
								>
									Github Organization
								</a>
							</li>
							<li>
								<a
									href="https://github.com/kungraseri/uncharted-lands/issues"
									target="_blank"
									rel="noreferrer"
									class="anchor"
								>
									Issue Tracking
								</a>
							</li>
						</ul>
					</div>
				</div>
			</section>
			<hr class="opacity-20" />
			<section
				class="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0"
			>
				<p class="text-xs">
					<a
						href="https://github.com/kungraseri/uncharted-lands/blob/main/LICENSE"
						target="_blank"
						rel="noreferrer"
						class="anchor"
					>
						GNU GPL v3
					</a>
					<span class="opacity-10 mx-2">|</span>
					<a href="https://redsyndicate.org" target="_blank" rel="noreferrer" class="anchor">
						Red Syndicate
					</a>
				</p>
				<div class="flex space-x-4">
					<a
						class="btn variant-soft"
						href="https://github.com/kungraseri/uncharted-lands"
						target="_blank"
						rel="noreferrer"
					>
						<Github />
						<span class="hidden md:inline-block ml-2"> Github </span>
					</a>
					<a
						class="btn variant-soft"
						href="https://discord.gg/eUuBSP6Qcb"
						target="_blank"
						rel="noreferrer"
					>
						<Discord />
						<span class="hidden md:inline-block ml-2"> Discord </span>
					</a>
					<a
						class="btn variant-soft"
						href="https://twitter.com/RedSyndicateOrg"
						target="_blank"
						rel="noreferrer"
					>
						<Twitter />
						<span class="hidden md:inline-block ml-2"> Twitter </span>
					</a>
				</div>
			</section>
		</div>
	</div>
</footer>

<style lang="scss" scoped>
	.hero-gradient {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-900) / 0.33) 0px,
				transparent 40%
			),
			radial-gradient(at 100% 0%, rgba(var(--color-primary-900) / 0.33) 0px, transparent 40%);
	}

	.feature-gradient {
		background-image: radial-gradient(
				at 0% 100%,
				rgba(var(--color-secondary-900) / 0.33) 0px,
				transparent 75%
			),
			radial-gradient(at 100% 0%, rgba(var(--color-primary-900) / 0.33) 0px, transparent 75%);
	}

	.footer-gradient {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-900) / 0.33) 0px,
				transparent 40%
			),
			radial-gradient(at 100% 0%, rgba(var(--color-primary-900) / 0.33) 0px, transparent 40%);
	}

	a {
		text-decoration-line: none !important;
	}
</style>
