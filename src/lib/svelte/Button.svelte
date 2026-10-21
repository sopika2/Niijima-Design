<script lang="ts">
	/** The landing page's button: paper front, red block behind, tilted. A link with `href`. */
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		href?: string;
		variant?: 'paper' | 'red' | 'hi' | 'ghost';
		small?: boolean;
		/** The arrow after the label; "down" turns it. */
		arrow?: boolean | 'down';
		children: Snippet;
	}

	let {
		href,
		variant = 'paper',
		small = false,
		arrow = true,
		type = 'button',
		children,
		...rest
	}: Props = $props();
	const cls = $derived(
		[
			'nj-btn',
			variant !== 'paper' && `nj-btn--${variant}`,
			small && 'nj-btn--small',
			arrow === 'down' && 'nj-btn--down'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

{#if href}
	<a {href} class={cls}
		>{@render children()}{#if arrow}<i class="nj-btn__arrow" aria-hidden="true"></i>{/if}</a
	>
{:else}
	<button {...rest} {type} class={cls}
		>{@render children()}{#if arrow}<i class="nj-btn__arrow" aria-hidden="true"></i>{/if}</button
	>
{/if}
