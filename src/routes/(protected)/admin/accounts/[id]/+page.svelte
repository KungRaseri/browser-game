<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	$: profile = data.account.profile;
</script>

<ol class="breadcrumb">
	<li class="crumb"><a href="/admin/">Dashboard</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/admin/accounts">Accounts</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>Account [{data.account.id}]</li>
</ol>

<div class="card p-4">
	<header class="card-header">
		<h2>
			{data.account.email}
		</h2>
		{`<${data.account.id}>`}
	</header>

	<div class="p-4">
		{data.account.role}
	</div>

	<h3>Profile</h3>
	{#if profile}
		<div class="card p-1 w-1/4">
			<header class="card-header flex space-x-1">
				<Avatar src={profile.picture} width="w-10" />
				<h4 class="p-1">{profile.username}</h4>
			</header>
		</div>
	{/if}
</div>
