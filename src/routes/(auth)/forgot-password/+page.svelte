<script lang="ts">
	import Information from 'svelte-material-icons-generator/svelte-material-icons/Information.svelte';
	import LockQuestion from 'svelte-material-icons-generator/svelte-material-icons/LockQuestion.svelte';

	import type { ActionData } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import { slide } from 'svelte/transition';

	export let form: ActionData;
</script>

<div class="card m-5 p-4 max-w-xl mx-auto">
	<div class="flex">
		<LockQuestion size={48} />
		<h1 class="h1">Forgot your password?</h1>
	</div>

	<section class="p-4">
		<form
			action="?/resetPassword"
			method="POST"
			class="space-y-2"
			use:enhance={() => {
				return async ({ result }) => {
					invalidateAll();
					await applyAction(result);
				};
			}}
		>
			<label for="email" class="label"> Email address </label>
			<input id="email" name="email" type="email" autocomplete="email" required class="input" />

			<div class="space-y-1">
				{#if form?.invalid}
					<div transition:slide|global>
						<div class="alert variant-ghost-error mx-5 mt-5">
							<div class="alert-message text-primary-50">
								<Information size={24} />
								<div class="grid grid-cols-1">Form information is invalid</div>
							</div>
						</div>
					</div>
				{/if}
				<button class="w-full p-2 btn btn-base variant-ghost-primary">Reset Password</button>
			</div>
		</form>
	</section>
</div>
