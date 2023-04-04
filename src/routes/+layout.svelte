<script lang="ts">
	import Header from './Header.svelte';
	import { cl, user, getStore, apiOpts } from '$lib/util';
	window.SvelteKit = {
		cl,
		user,
		getStore,
		apiOpts
	};
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	:global(body),
	:global(html) {
		margin: 0;
		padding: 0;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: 0;
		padding: 0;
		--orange: #f9a636;
		--orange-button: var(--orange);
		--orange-light: #ffce8c;
		--orange-dark: #b46d34;
		--orange-scrollbar-back: #a15d04;
		--background: white;
		--foreground: black;
		--foreground-orange: white;

		background-color: var(--background);
		color: var(--foreground);

		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
			Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
			sans-serif;
	}

	main {
		padding: 0.5em;
	}
</style>
