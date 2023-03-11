<script lang="ts">
	import { user, apiOpts } from '$lib/util';

	let post = '';

	export let chat = 'home';

	function sendPost() {
    if ($user === null) return;
		let endpoint = chat === 'home' ? 'v1/home' : `v1/chats/${chat}/messages/`;

		fetch(`${apiOpts.apiBaseUrl}${endpoint}`, {
			method: 'POST',
			headers: {
				Authorization: `${$user.token}`
			},
			body: JSON.stringify({
				content: post
			})
		});

		post = '';

		const input: HTMLInputElement | null =
			document.querySelector('input[type="text"]');
		if (input) input.value = '';
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
