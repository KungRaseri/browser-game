<script lang="ts">
	import type { Settlement } from '@prisma/client';

	export let settlement: Settlement;
</script>

<a href="/game/settlements/{settlement.id}/">{settlement.id}</a> | {settlement.name}
