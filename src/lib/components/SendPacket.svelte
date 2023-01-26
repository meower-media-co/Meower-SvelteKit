<script lang="ts">
	import type CloudLink from "$lib/cloudlink/cloudlink";
	import type {CurrentUser} from "$lib/meower-types";
	import {getContext} from "svelte";
	import type {Writable} from "svelte/store";

	const cl: CloudLink = getContext("cl");

	let post = "";

	const user: Writable<CurrentUser | null> = getContext("user");

	function sendPost() {
		cl.send({
			cmd: "direct",
			val: {
				cmd: "post_home",
				val: post
			}
		});

		post = "";

		// clear the input
		const input: HTMLInputElement | null =
			document.querySelector('input[type="text"]');
		if (input) input.value = "";
	}
</script>

{#if $user}
	<form class="form" on:submit|preventDefault={sendPost}>
		<input class="text" type="text" bind:value={post} />
		<input type="submit" value="Post" />
	</form>
{/if}

<style lang="scss">
	.form {
		display: flex;
		gap: 0.5em;
		flex-wrap: nowrap;
		width: 100%;
	}
	.text {
		flex-grow: 1;
		flex-shrink: 1;
	}
</style>
