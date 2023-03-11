<script lang="ts">
	import Ulist from '$lib/components/Ulist.svelte';
	import PostList from '$lib/components/PostList.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Meower SvelteKit" />
</svelte:head>

<div class="header">
	<h1>Home</h1>

	<Ulist />
</div>

<section>
	<PostList />
</section>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;

		border-color: var(--orange-button);
		border-style: solid;
		margin-bottom: 12px;
	}

	.header * {
		margin: 12px;
	}
</style>
