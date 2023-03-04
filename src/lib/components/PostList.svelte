<script lang="ts">
	import type {CurrentUser, PostJSON, PostPacket, SubscibePacket} from "../meower-types";
	import PFP from "./PFP.svelte";
	import Container from "$lib/ui/Container.svelte";

	import {getContext, onDestroy, onMount} from "svelte";
	import SendPacket from "$lib/components/SendPacket.svelte";
	import cacheFetch from "$lib/util/cacheFetch";

	import type CloudlinkClient from "@williamhorning/cloudlink";	
	import type {PostItem} from "$lib/meower-types";

	import PagedList from "./PagedList.svelte";
	import type {Item, LoadPageReturn} from "./PagedList.svelte";
	import TimeBox from "./TimeBox.svelte";
	import type {Writable} from "svelte/store";
	import {goto} from "$app/navigation";
	import {apiUrl} from "$lib/urls";
	const cl: CloudlinkClient = getContext("cl");
	const user: Writable<CurrentUser | null> = getContext("user");

	let list: undefined | PagedList;
	export let chat = "home";

	async function loadChatPage(page: number): Promise<LoadPageReturn> {
		if (chat == "livechat") return {numPages: 0, result: []};
		if ($user == null) {
			goto(
				`/login?redirect=${encodeURIComponent(
					window.location.pathname + "?id=" + chat
				)}`
			);
			return {
				numPages: 0,
				result: []
			};
		}

		const resp: PostJSON[] = await (
			await cacheFetch(`${apiUrl}v1/chats/${chat}/messages`, {
				headers: {
					Authorization: `${$user.token}`
				},
				mode: "cors"
			})
		).json();

		const result: Item[] = resp.map((post) => { 
			return {
				...post,
				id: post.id
			};
		});
		return {
			numPages: 1,
			result
		};
	}

	async function loadPage(page: number = 1): Promise<LoadPageReturn> {
		
		if (chat !== "home") return await loadChatPage(page);

		let path = `v1/home/latest`;
		const resp = await cacheFetch(
			`${apiUrl}${path}`,
			{
				headers: {
					Authorization: `${$user?.token}`,
				},
			}
		);

		if (!resp.ok) {
			throw new Error("Response code is not OK; code is " + resp.status);
		}
		const json: PostJSON[] = await resp.json();
		const result: PostItem[] = json.map((post) => ({
			...post,
			id: post.id,
		}));


		return {
			numPages: 1,
			result
		};
	}
	
	onMount(() => (async () => {
		
		if (chat == "home") {
			//@ts-ignore
		cl._websocket.addEventListener("message", (event: MessageEvent) => {

			var packet: PostPacket = event.data as PostPacket;
			if (typeof packet == "string") packet = JSON.parse(packet);
		
			if (!(packet.cmd == "post_created")) return; //OH MY GOD.
		
			// why does ts not autoextend Object?...
			if (!packet.hasOwnProperty("val")) return;
			if (packet.hasOwnProperty("val") && typeof packet.val == "string") packet.val = JSON.parse(packet.val) 


			if (list == null) return; 

			console.log(packet);
			list.addItem({
				...packet.val as PostJSON,
				id: packet.val.id
			});
		});
	} else {
		//@ts-ignore
		cl._websocket.addEventListener("message", (event: MessageEvent) => {

			var packet: PostPacket = event.data as PostPacket;
			if (typeof packet == "string") packet = JSON.parse(packet);
		
			if (!(packet.cmd == "message_created")) return; //OH MY GOD.
		
			// why does ts not autoextend Object?...
			if (!packet.hasOwnProperty("val")) return;
			if (packet.hasOwnProperty("val") && typeof packet.val == "string") packet.val = JSON.parse(packet.val)


			if (list == null) return;

			console.log(packet);
			list.addItem({
				...packet.val as PostJSON,
				id: packet.val.id
			});
		});
	}




		//@ts-ignore
		if (cl && cl._websocket.readyState == 1) {
			if (chat == "home")
			cl.send({
				"cmd": "subscribe",
				"type": "new_posts",
				"val": null
			} as SubscibePacket);
			if (chat !== "home") {
				cl.send({
					"cmd": "subscribe",
					"type": "posts",
					"val": null,
					"id": chat
				} as SubscibePacket);
			}
		} else {
			cl.on("open", async () => {
				// detect if the conponent is still mounted
				if (chat !== "home")
				cl.send({
					"cmd": "subscribe",
					"type": "posts",
					"val": null,
					"id": chat
				} as SubscibePacket);
				
				if (chat == "home")
				cl.send({
					"cmd": "subscribe",
					"type": "new_posts",
					"val": null
				} as SubscibePacket);
			});

		}
	})());

	onDestroy(() => {
		if (chat == "home")
		cl.send({
			"cmd": "unsubscribe",
			"type": "new_posts",
			"val": null
		} as SubscibePacket);

		if (chat !== "home")
		cl.send({
			"cmd": "unsubscribe",
			"type": "posts",
			"val": null,
			"id": chat
		} as SubscibePacket);
		
		//remove all listeners in this componen

	});

</script>

<!-- {"cmd": "post_created", "val": {"id": "417395421443260416", "author": {"id": "417185314218442752", "username": "AAAAAAAAAAA", "flags": 0, "icon": {"type": 0, "data": 2}}, "masquerade": null, "public_flags": 0, "stats": {"likes": 0, "meows": 0, "comments": 0}, "content": "a", "filtered_content": null, "time": 1677351623, "delete_after": null}} -->
<div class="layout">
	<SendPacket {chat} />
	<PagedList bind:this={list} {loadPage}>
		<Container slot="item" let:item={post}>
			<!-- checking for mascurade -->

			<div class="post-author">
				<PFP username={post.author.id} />
				<h2>{post.author.username}</h2>
			</div>

			<TimeBox date={post.time} />
			<p>{post.content}</p>
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
