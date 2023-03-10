<script lang="ts">
	import {getContext} from "svelte";

	import type CloudlinkClient from "@williamhorning/cloudlink"	
	import type {Chat, CurrentUser} from "$lib/meower-types";
	import type {Writable} from "svelte/store";
	import {goto} from "$app/navigation";
	import {onMount} from "svelte";
	import type { CloudlinkPacket } from "@williamhorning/cloudlink";
	const cl: CloudlinkClient = getContext("cl");
	const user: Writable<CurrentUser | null> = getContext("user");

	let chats: Chat[] = [];

	onMount(async () => {
		if ($user == null) {
			goto(
				`/login?redirect=${encodeURIComponent(
					window.location.pathname
				)}`
			);
		}
		chats = $user ? $user.chats : [];
	});

	//@ts-ignore 
	cl._websocket.addEventListener("message", (e: MessageEvent) => {
		const data:CloudlinkPacket&Object = JSON.parse(e.data);
		
		if (data.cmd !== "chat_created" ) {return};
		if (!(data.hasOwnProperty("val"))) {return};

		//check if data.val is a chat
		if (!(data.val.hasOwnProperty("id"))) {return};


		chats.push(data.val as Chat);

	});

</script>


{#each chats as chat}
	<div class="chat_main_div">
		<a href="/chat?id={chat.id}">
			<div class="chat_div">
				<div class="chat_name">
					<h3>{chat.name}</h3>
				</div>
			</div>
		</a>
	</div>
{/each}

<style lang="scss">
	.chat_main_div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.chat_div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		border: 1px solid black;
		border-radius: 10px;
		padding: 10px;
		margin: 10px;
	}

	.chat_name {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
</style>
