<script lang="ts">
	import {setContext, getContext} from "svelte";

	import Header from "./Header.svelte";
	import "./styles.css";

	import CloudLink from "$lib/cloudlink/cloudlink";
	import {linkUrl} from "$lib/urls";

	setContext("cl", new CloudLink());
	const cl: CloudLink = getContext("cl");
</script>

<div class="app">
	<Header />

	<main>
		{#await cl.connect(linkUrl)}
			Connecting...
		{:then}
			<slot />
		{:catch e}
			Error connecting: {e}
		{/await}
	</main>

	<footer />
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
		

	}

	

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
