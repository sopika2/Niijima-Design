<script lang="ts">
	/**
	 * The landing page's background: a red band and a thin paper slash across the screen, an
	 * outlined starburst and a ghost word. Put it first inside a positioned, isolated element.
	 */
	import { burstPoints } from '../js/burst.js';

	interface Props {
		ghost?: string;
		burst?: boolean;
	}

	let { ghost, burst = true }: Props = $props();
	const points = burstPoints('net', 14, 49, 33);
</script>

<div class="nj-bands" aria-hidden="true">
	{#if burst}<svg class="nj-bands__burst" viewBox="0 0 100 100"><polygon {points} /></svg>{/if}
	<span class="nj-bands__band"></span>
	<span class="nj-bands__band nj-bands__band--thin"></span>
	{#if ghost}<span class="nj-bands__ghost">{ghost}</span>{/if}
</div>
