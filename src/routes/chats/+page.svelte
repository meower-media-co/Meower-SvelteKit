<script lang="ts">
	import type { CloudlinkPacket } from '@williamhorning/cloudlink';
	import type { Chat } from '$lib/meower-types';
	import { onMount } from 'svelte';
	import { user, cl, apiOpts } from '$lib/util';

	let chats: Chat[] = [];

	onMount(async () => {
		if ($user == null) {
			window.location.assign(
				`/login?redirect=${encodeURIComponent(window.location.pathname)}`
			);
		}
		chats = [
			...(await (
				await fetch(`${apiOpts.apiBaseUrl}v1/me/chats`, {
					headers: {
						Authorization: `${$user?.token}`
					}
				})
			).json()),
			{
				id: 'livechat',
				name: 'Livechat'
			}
		];
	});

	$cl.on('chat_created', (data: CloudlinkPacket) => {
		if (!data.val || !data.val.id) return;
		chats.push(data.val as Chat);
	});
</script>

{#each chats as chat}
	<div class="chat_main_div">
		<a href="/chats/{chat.id}">
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
