<script lang="ts">
	import Header from './Header.svelte';
	import './styles.scss';
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
	<slot />
</div>
