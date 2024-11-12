<script lang="ts">
	import Information from 'svelte-material-icons-generator/svelte-material-icons/Information.svelte';
	import LoginVariant from 'svelte-material-icons-generator/svelte-material-icons/LoginVariant.svelte';

	import type { ActionData, PageData } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { slide } from 'svelte/transition';

	let isRememberMeChecked = false;

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="mx-auto w-full md:w-96 mt-2 lg:mt-5 bg-surface-200-700-token">
	<div class="mx-auto w-full px-5 py-3">
		<div class="flex my-5 space-x-3">
			<LoginVariant size={36} />
			<h1 class="text-2xl tracking-tight font-bold text-token">Sign into your account</h1>
		</div>

		<form
			action="?/login&redirectTo={data.redirectTo}"
			method="POST"
			class="space-y-1 md:space-y-3"
			use:enhance={() => {
				return async ({ result }) => {
					invalidateAll();
					await applyAction(result);
				};
			}}
		>
			<label for="email" class="label">
				<span>Email address</span>
				<input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					required
					class="input {form?.email ? 'input-error' : ''}"
				/>
			</label>

			<label for="password" class="label">
				<span>Password</span>
				<input
					id="password"
					name="password"
					type="password"
					autocomplete="current-password"
					required
					class="input {form?.email ? 'input-error' : ''}"
				/>
			</label>

			<div class="flex justify-around items-center">
				<label for="remember_me" class="label">
					<input
						id="remember_me"
						name="remember_me"
						type="checkbox"
						class="checkbox"
						bind:checked={isRememberMeChecked}
					/>
					<span class="">Remember me</span>
				</label>

				<a href="forgot-password" class="anchor font-medium">Forgot your password?</a>
			</div>

			{#if form?.email}
				<div transition:slide|global class="hidden lg:block">
					<div class="alert variant-ghost-error mx-5 mt-5">
						<div class="alert-message text-token justify-center items-center">
							<Information size={24} />
							<div class="grid grid-cols-1">
								<span>{form?.incorrect ? 'Information is incorrect' : ''}</span>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<button class="w-full p-2 btn bg-primary-400-500-token rounded-md"> Login </button>
		</form>
	</div>
</div>
