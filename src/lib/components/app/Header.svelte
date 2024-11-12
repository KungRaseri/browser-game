<script lang="ts">
	import { page } from '$app/stores';

	import { AppBar, popup, LightSwitch, type PopupSettings } from '@skeletonlabs/skeleton';

	import MenuIcon from 'svelte-material-icons-generator/svelte-material-icons/Menu.svelte';
	import Account from 'svelte-material-icons-generator/svelte-material-icons/Account.svelte';
	import Close from 'svelte-material-icons-generator/svelte-material-icons/Close.svelte';
	import BellOutline from 'svelte-material-icons-generator/svelte-material-icons/BellOutline.svelte';
	import { slide } from 'svelte/transition';

	const MenuOptions: PopupSettings = {
		event: 'click',
		target: 'userMenu',
		placement: 'bottom'
	};

	export let isMainMenuOpen = false;
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="!space-x-0 lg:space-x-4 place-content-end"
	background="bg-surface-100-800-token"
	shadow="shadow-md"
>
	<svelte:fragment slot="lead">
		<div class="block lg:hidden">
			<button
				type="button"
				class="px-1.5 py-0 btn-icon variant-soft-surface justify-center items-center"
				aria-controls="mobile-menu"
				aria-expanded="false"
				on:click={() => {
					isMainMenuOpen = !isMainMenuOpen;
				}}
			>
				{#if !isMainMenuOpen}
					<MenuIcon size={24} />
				{:else}
					<Close size={24} />
				{/if}
			</button>
		</div>
		<div class="hidden lg:block">
			{#each $page.data.mainMenuLinks as link}
				<a
					href={link.href}
					class="btn rounded-md bg-primary-hover-token"
					class:bg-primary-active-token={$page.url.pathname === link.href}
					class:hidden={link.requiredRole &&
						$page.data.account &&
						$page.data.account.role !== link.requiredRole}
					aria-current={$page.url.pathname === link.href ? 'page' : undefined}
				>
					<span class="text-token">
						{link.name}
					</span>
				</a>
			{/each}
		</div>
	</svelte:fragment>

	<svelte:fragment>
		<LightSwitch
			bgDark="bg-surface-800"
			bgLight="bg-surface-100"
			fillDark="fill-surface-800"
			fillLight="fill-surface-100"
			ring="ring-2 ring-surface-800-100-token"
			rounded="rounded-full"
			class="m-0 p-0"
		/>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		{#if !$page.data.account}
			<a
				href="/sign-in"
				class="btn rounded-md text-token bg-primary-hover-token"
				class:bg-primary-active-token={$page.url.pathname === '/sign-in'}
				data-testid="header-signin"
			>
				<span class="text-token"> Sign in </span>
			</a>
			<a
				href="/register"
				class="btn rounded-md bg-primary-hover-token"
				class:bg-primary-active-token={$page.url.pathname === '/register'}
				data-testid="header-register"
			>
				<span class="text-token"> Register </span>
			</a>
		{:else}
			<div class="flex lg:space-x-1">
				<button type="button" class="btn btn-icon bg-surface-200-700-token">
					<BellOutline size="50%" />
				</button>

				<button
					type="button"
					class="btn btn-icon bg-surface-200-700-token"
					id="user-menu-button"
					aria-expanded="false"
					aria-haspopup="true"
					use:popup={MenuOptions}
				>
					{#if $page.data.account.profile?.picture}
						<img class="rounded-full" src={$page.data.account.profile.picture} alt="user menu" />
					{:else}
						<Account size="50%" />
					{/if}
				</button>
				<span class="relative rounded-md">
					<nav
						class="list-nav card p-3 -ml-5 mt-1 rounded-md"
						aria-labelledby="user-menu-button"
						tabindex="-1"
						data-popup="userMenu"
					>
						{#each $page.data.userMenuLinks as link}
							<div
								class:hidden={link.requiredRole &&
									$page.data.account &&
									link.requiredRole !== $page.data.account.role}
							>
								<a
									href={link.href}
									class="btn"
									class:bg-primary-active-token={$page.url.pathname === link.href}
									aria-current={$page.url.pathname === link.href ? 'page' : undefined}
								>
									<span class="text-token">
										{link.name}
									</span>
								</a>
							</div>
						{/each}
						<form method="POST" action="/auth?/signout">
							<button class="btn">
								<span class="text-token"> Sign out </span>
							</button>
						</form>
					</nav>
				</span>
			</div>
		{/if}
	</svelte:fragment>
</AppBar>

<!-- Mobile menu, show/hide based on menu state. -->
{#if isMainMenuOpen}
	<div
		transition:slide|global
		class="xs:hidden"
		id="mobile-menu"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="main-menu-button"
	>
		<div class="m-0 p-0 space-y-0 btn-group-vertical w-full rounded-none">
			{#each $page.data.mainMenuLinks as link}
				<a
					href={link.href}
					class="btn rounded-none bg-primary-hover-token"
					class:bg-primary-active-token={$page.url.pathname === link.href}
					on:click={() => {
						isMainMenuOpen = false;
					}}
					aria-current={$page.url.pathname === link.href ? 'page' : undefined}
				>
					<span class="text-token">
						{link.name}
					</span>
				</a>
			{/each}
		</div>
		<div class="arrow variant-filled-primary" />
	</div>
{/if}
