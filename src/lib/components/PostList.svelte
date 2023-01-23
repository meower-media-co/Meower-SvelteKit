<script lang="ts">
	import type { PostJSON } from '../meower-types';
	import PFP from "./PFP.svelte";
	import Container from "$lib/ui/Container.svelte";

	import {getContext} from "svelte";
	import SendPacket from "$lib/components/SendPacket.svelte";
	import cacheFetch from "$lib/util/cacheFetch";
	import type CloudLink from "$lib/cloudlink/cloudlink";
	import type {PostPacket} from "$lib/cloudlink/cloudlink-types";
	import type {PostListJSON, PostItem} from "$lib/meower-types";

	import PagedList from "./PagedList.svelte";
	import type {Item, LoadPageReturn} from "./PagedList.svelte";
	import TimeBox from "./TimeBox.svelte";
	const cl: CloudLink = getContext("cl");

	let list: undefined | PagedList;

	async function loadPage(page: number = 1): Promise<LoadPageReturn> {
		let numPages = 0;
		let path = `home?page=`;
		const resp = await cacheFetch(`https://api.meower.org/${path}${page}`);
		if (!resp.ok) {
			throw new Error("Response code is not OK; code is " + resp.status);
		}
		const json: PostListJSON = await resp.json();
		const result: PostItem[] = json.autoget.map((post) => ({
			...post,
			id: post.post_id
		}));

        result.forEach((packet: PostJSON) => {
            if (packet.u == "Discord" && packet.p.includes(": ")) {
                packet.u = packet.p.split(": ")[0];
                packet.p = packet.p.split(": ")[1];
            }
        });
            
        

		return {
			numPages,
			result
		};
	}

	cl.on("direct", (packet: PostPacket) => {
		if (!packet.val.hasOwnProperty("post_origin")) return;
		if (packet.val.post_origin !== "home") return;

		if (packet.val.u == "Discord" && packet.val.p.includes(": ")) {
			packet.val.u = packet.val.p.split(": ")[0];
			packet.val.p = packet.val.p.split(": ")[1];
		}

		if (list)
			list.addItem({
				...packet.val,
				id: packet.val.post_id
			});
	});
</script>

<div class="layout">
	<SendPacket />
	<PagedList bind:this={list} {loadPage}>
		<Container slot="item" let:item={post}>
			<div class="post-author">
				<PFP username={post.u} />
				<h2>{post.u}</h2>
			</div>
			<TimeBox date={post.t.e} />
			<p>{post.p}</p>
		</Container>
	</PagedList>
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		* {
			width: 100%;
		}
	}
	.post-author {
		display: flex;
		align-items: center;
		gap: 0.25em;
		h2 {
			font-size: 200%;
			margin: 0;
		}
	}
</style>
