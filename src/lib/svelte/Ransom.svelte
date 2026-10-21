<script lang="ts">
	/**
	 * A ransom-note title. The text stays readable to screen readers; the tiles are decoration.
	 * `size` is the letter size (any CSS length); `animate` drops the tiles in on first show.
	 */
	import { ransom, type RansomOptions } from '../js/ransom.js';

	interface Props extends RansomOptions {
		text: string;
		size?: string;
		animate?: boolean;
		/** The element to render: h1, h2, span… Default span. */
		as?: string;
		class?: string;
	}

	let {
		text,
		size,
		animate = false,
		as = 'span',
		class: className = '',
		...options
	}: Props = $props();
	const words = $derived(ransom(text, options));
</script>

<svelte:element
	this={as}
	class={['nj-ransom', className, animate && 'is-in']}
	style={size ? `--nj-ransom-size:${size}` : undefined}
	><span class="nj-sr">{text}</span>{#each words as word, w (w)}<span
			class="nj-ransom__word"
			aria-hidden="true"
			>{#each word as letter, i (i)}<span
					class="nj-ransom__tile t-{letter.tile}"
					style={letter.tileStyle}
					><span class="nj-ransom__face" style={letter.faceStyle}>{letter.char}</span></span
				>{/each}</span
		>{/each}</svelte:element
>
