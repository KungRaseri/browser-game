<script lang="ts">
	import type { PageData } from './$types';

	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import UnderConstruction from '$lib/components/app/UnderConstruction.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Forums - Coming Soon™ | Uncharted Lands</title>
</svelte:head>

<div class="container m-auto mt-10">
	{#each data.forums as forum, index}
		<Accordion autocollapse>
			<AccordionItem>
				<svelte:fragment slot="summary">
					{forum.name}
				</svelte:fragment>
				<svelte:fragment slot="content">
					{#each forum.sub_forums as sub_forum}
						<Accordion autocollapse>
							<AccordionItem>
								<svelte:fragment slot="summary">
										{sub_forum.name}
								</svelte:fragment>
									<svelte:fragment slot="content">
										{#each sub_forum.topics as topic}
											<Accordion autocollapse>
												<AccordionItem>
													<svelte:fragment slot="summary">
															{topic.title}
													</svelte:fragment>
														<svelte:fragment slot="content">
															{topic.content}
														</svelte:fragment>
												</AccordionItem>
											</Accordion>
										{/each}
									</svelte:fragment>
							</AccordionItem>
						</Accordion>
					{/each}

					{#each forum.topics as topic}
					<Accordion autocollapse>
						<AccordionItem>
							<svelte:fragment slot="summary">
									{topic.title}
							</svelte:fragment>
								<svelte:fragment slot="content">
									{topic.content}
								</svelte:fragment>
						</AccordionItem>
					</Accordion>
					{/each}
				</svelte:fragment>	
			</AccordionItem>
	</Accordion>
	{/each}
</div>
