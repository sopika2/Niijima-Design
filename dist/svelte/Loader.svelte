<script lang="ts">
	/**
	 * "Take your time": ink wiped across the screen, the red band, the words in cut-out tiles and
	 * a spinning thief star (or your own figure: a GIF or WebP in `figure`).
	 * `instant` skips the wipe-in, for the very first paint.
	 */
	import { STAR_POINTS } from '../js/burst.js';
	import Bands from './Bands.svelte';
	import Ransom from './Ransom.svelte';

	interface Props {
		text?: string;
		figure?: string | null;
		instant?: boolean;
		leaving?: boolean;
	}

	let {
		text = 'Take your time',
		figure = null,
		instant = false,
		leaving = false
	}: Props = $props();
</script>

<div
	class="nj-loader"
	class:is-instant={instant}
	class:is-leaving={leaving}
	role="status"
	aria-live="polite"
>
	<Bands burst={false} />
	<div class="nj-loader__corner">
		{#if figure}
			<img class="nj-loader__figure" src={figure} alt="" />
		{:else}
			<svg class="nj-loader__star" viewBox="0 0 100 100" aria-hidden="true"
				><polygon points={STAR_POINTS} /></svg
			>
		{/if}
		<Ransom class="nj-loader__text" text={text.toUpperCase()} seed="loader" />
	</div>
</div>
