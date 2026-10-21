<script lang="ts">
	/** A speech box: paper card, an ink tag with a number and a word, a tail pointing up. */
	import type { Snippet } from 'svelte';

	interface Props {
		tag?: { number?: string; word?: string };
		title?: string;
		tail?: boolean;
		children?: Snippet;
	}

	let { tag, title, tail = true, children }: Props = $props();
</script>

<div class="nj-speech" class:nj-speech--no-tail={!tail}>
	{#if tag}<div class="nj-speech__tag">
			{#if tag.number}<b>{tag.number}</b>{/if}{#if tag.word}<span>{tag.word}</span>{/if}
		</div>{/if}
	<div class="nj-speech__card">
		{#if title}<p class="nj-speech__title">{title}</p>{/if}
		{#if children}{@render children()}{/if}
	</div>
</div>
