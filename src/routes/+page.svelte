<script lang="ts">
	import Ulist from './../lib/ui/Ulist.svelte';
	import welcome from "$lib/images/svelte-welcome.webp";
	import welcome_fallback from "$lib/images/svelte-welcome.png";

	import {onMount} from "svelte";
	import {linkUrl} from "$lib/urls";


	import {getContext} from "svelte";
	import type {Writable} from "svelte/store";

	import type CloudLink from "$lib/cloudlink/cloudlink";
	import type {Packet} from "$lib/cloudlink/cloudlink-types";

	import type {User, CurrentUser} from "$lib/meower-types";
	import PostList from "$lib/components/PostList.svelte";
	import Login from '$lib/ui/Login.svelte';

	const cl: CloudLink = getContext("cl");
	const user: Writable<CurrentUser | null> = getContext("user");
	
	let UString: String = "";

	cl.on('ulist', (users: any) => {
		UString = users.val.split(";").join(", ").toString();
	})
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Meower SvelteKit" />
</svelte:head>

<Ulist />
{#if !$user}
	<div class="login"><Login /></div>
{/if}
<section>

	<PostList />
</section>

<style lang="scss">
	.login {
		margin-bottom: 0.5em;
	}
</style>