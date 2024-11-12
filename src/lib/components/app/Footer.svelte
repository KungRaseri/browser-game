<script lang="ts">
	import Github from 'svelte-material-icons-generator/svelte-material-icons/Github.svelte';
</script>

<footer class="hidden sm:block p-5 space-y-3 justify-center items-center bg-surface-100-800-token">
	<div class="w-fit mx-auto">
		<a href="https://github.com/redsyndicate/browser-game" class="text-token">
			<span class="sr-only">GitHub</span>
			<Github size={24} />
		</a>
	</div>

	<nav class="w-fit mx-auto flex" aria-label="Footer">
		<div class="px-5">
			<a
				href="/game"
				class="
					btn rounded-md 
					bg-primary-hover-token
					"
			>
				Game
			</a>
		</div>

		<div class="px-5">
			<a
				href="/forum"
				class="
					btn rounded-md 
					bg-primary-hover-token
					"
			>
				Forum
			</a>
		</div>

		<div class="px-5">
			<a
				href="/kb"
				class="
					btn rounded-md 
					bg-primary-hover-token
					"
			>
				Knowledgebase
			</a>
		</div>

		<div class="px-5">
			<a
				href="/support"
				class="
					btn rounded-md 
					bg-primary-hover-token
					"
			>
				Support
			</a>
		</div>
	</nav>
</footer>