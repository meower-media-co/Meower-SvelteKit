<script lang="ts">
	import { handle32bitdate } from '$lib/util';
	export let date: number;
	export let bettertime: boolean = false;
	let data = handle32bitdate(date, bettertime);
</script>

<span
	title="Time & Date in your timezone: {data.text}. ISO Time: {data.iso}. Unix timestamp: {data.timestamp}."
	class="date"
>
	{data.text}
</span>

<style>
	.date {
		font-style: italic;
		cursor: help;
	}
</style>
