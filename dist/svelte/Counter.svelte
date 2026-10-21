<script lang="ts">
	/** A big number in a paper frame with a red shadow: "3/3 ONLINE", "3,019,581 Ft TOTAL". */
	interface Props {
		value: string;
		label: string;
		/** A small tag in the corner, e.g. LIVE. */
		source?: string;
	}

	let { value, label, source }: Props = $props();
</script>

<p class="nj-counter">
	<b class="nj-counter__num">{value}</b><span class="nj-counter__lbl">{label}</span
	>{#if source}<span class="nj-counter__src">{source}</span>{/if}
</p>
