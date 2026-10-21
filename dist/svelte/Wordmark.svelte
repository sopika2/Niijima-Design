<script lang="ts">
	/** NIIJIMA SISTERS 新島姉妹 (or any name), on a tilted ink plate. A link with `href`. */
	interface Props {
		name?: string;
		kanji?: string | null;
		href?: string;
	}

	let { name = 'Niijima Sisters', kanji = '新島姉妹', href }: Props = $props();
</script>

<svelte:element this={href ? 'a' : 'span'} class="nj-wordmark" {href}
	>{name}{#if kanji}<small>{kanji}</small>{/if}</svelte:element
>
