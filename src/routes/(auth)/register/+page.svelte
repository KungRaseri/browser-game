<script lang="ts">
	import Information from 'svelte-material-icons-generator/svelte-material-icons/Information.svelte';
	import AccountPlus from 'svelte-material-icons-generator/svelte-material-icons/AccountPlus.svelte';

	import type { ActionData } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import { slide } from 'svelte/transition';

	export let form: ActionData;
</script>

<div class="mx-auto w-full md:w-96 mt-2 lg:mt-5 bg-surface-200-700-token rounded-md">
	<div class="mx-auto w-full px-5 py-3">
		<div class="flex my-5 space-x-3">
			<AccountPlus size={36} />
			<h1 class="text-2xl tracking-tight font-bold text-token">Register your account</h1>
		</div>

		<form
			action="?/register"
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
					class="input {form?.invalid ? 'input-error' : ''}"
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					required
				/>
			</label>

			<label for="password" class="label">
				<span>Password</span>
				<input
					class="input {form?.invalid ? 'input-error' : ''}"
					id="password"
					name="password"
					type="password"
					autocomplete="current-password"
					required
				/>
			</label>

			{#if form?.invalid}
				<div transition:slide|global>
					<div class="alert variant-ghost-error mx-5 mt-5">
						<div class="alert-message text-token">
							<Information size={24} />
							<div class="grid grid-cols-1">Form information is invalid</div>
							{#if form?.length}
								Password must be 16 or more characters in length
							{/if}
							{#if form?.exists}
								Please enter the account information again
							{/if}
						</div>
					</div>
				</div>
			{/if}

			<button class="w-full p-2 btn bg-primary-400-500-token rounded-md">Register</button>
		</form>
	</div>
</div>
