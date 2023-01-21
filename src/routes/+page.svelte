<script lang="ts">
	import SendPacket from './../lib/components/SendPacket.svelte';
	import welcome from "$lib/images/svelte-welcome.webp";
	import welcome_fallback from "$lib/images/svelte-welcome.png";

	import {onMount} from "svelte";
	import {linkUrl} from "$lib/urls";


	import {getContext} from "svelte";
	import type CloudLink from "$lib/cloudlink/cloudlink";
	import type {Packet} from "$lib/cloudlink/cloudlink-types";
	import PostList from "$lib/components/PostList.svelte";
	const cl: CloudLink = getContext("cl");



</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Meower SvelteKit" />
</svelte:head>

<section>
	<SendPacket />
	<PostList />	
</section>

<style lang="scss">
</style>
