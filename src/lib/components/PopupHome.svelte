<script lang="ts">
	import Popup from "$lib/ui/Popup.svelte";
	import Ulist from "$lib/ui/Ulist.svelte";
	import welcome from "$lib/images/svelte-welcome.webp";
	import welcome_fallback from "$lib/images/svelte-welcome.png";

	import {onMount} from "svelte";
	import {linkUrl} from "$lib/urls";

	import {getContext} from "svelte";
	import type {Writable} from "svelte/store";

	import type CloudlinkClient from "@williamhorning/cloudlink";	
	import type {User, CurrentUser, CurrentUserClass} from "$lib/meower-types";
	import Login from "$lib/ui/Login.svelte";
	import {goto} from "$app/navigation";
	//@ts-ignore
	import PostList from "$lib/components/PostList.svelte";

	const cl: CloudlinkClient = getContext("cl");
	const user: Writable<CurrentUserClass | null> = getContext("user");

	let UString: String = "";

	// get redirect url in the query string
	const urlParams = new URLSearchParams(window.location.search);

	// check if redirect url is on the same domain
	var redirect = urlParams.get("redirect");
	if (redirect && redirect.startsWith(window.location.origin + "/")) {
		redirect = "/";
	}

	cl.on("ulist", (users: any) => {
		if (cl.ulist != null)
		UString = cl.ulist?.join(", ").toString();
	});

	export let title = "login";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Meower SvelteKit" />
</svelte:head>

<Popup {title}>
	<slot name="content">
		<Login />
	</slot>
</Popup>

<!-- redirect user to root if user exists -->
{#if $user}
	{#await goto(redirect || "/")}
		<br />
	{/await}
{/if}

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
