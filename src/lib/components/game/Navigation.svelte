<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotLead="place-self-start"
	slotDefault="place-self-center"
	slotTrail="place-self-end"
	padding="px-3 py-0"
	background="bg-surface-200-700-token"
	shadow="shadow-md"
>
	<svelte:fragment slot="lead">
		<div class="btn-group rounded-none">
			<a
				href="/game"
				class="btn btn-sm rounded-none hover:bg-primary-hover-token hover:text-primary-50-900-token"
			>
				Overview
			</a>
			<a
				href="/game/settlements"
				class="btn btn-sm rounded-none hover:bg-primary-hover-token hover:text-primary-50-900-token"
			>
				Settlements
			</a>
			<a
				href="/game/map"
				class="btn btn-sm rounded-none hover:bg-primary-hover-token hover:text-primary-50-900-token"
			>
				Map
			</a>
			<a
				href="/game/wardens"
				class="btn btn-sm rounded-none hover:bg-primary-hover-token hover:text-primary-50-900-token"
			>
				Wardens
			</a>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<div class="btn-group rounded-none">
			<a
				href="/game/profile"
				class="btn btn-sm rounded-none hover:bg-primary-hover-token hover:text-primary-50-900-token"
			>
				Profile
			</a>
			<a
				href="/game/history"
				class="btn btn-sm rounded-none hover:bg-primary-hover-token hover:text-primary-50-900-token"
			>
				History
			</a>
			<a
				href="/game/messages"
				class="btn btn-sm rounded-none hover:bg-primary-hover-token hover:text-primary-50-900-token"
			>
				Messages
			</a>
			<a
				href="/game/federation"
				class="btn btn-sm rounded-none hover:bg-primary-hover-token hover:text-primary-50-900-token"
			>
				Federation Forum
			</a>
			<a
				href="/game/federation"
				class="btn btn-sm rounded-none hover:bg-primary-hover-token hover:text-primary-50-900-token"
			>
				Federation
			</a>
		</div>
	</svelte:fragment>
</AppBar>
