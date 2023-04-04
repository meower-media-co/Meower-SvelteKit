<script lang="ts">
	import type {
		Message,
		MessagePacket,
		Post,
		PostPacket,
		SubscribePacket
	} from '$lib/meower-types';
	import type { Item, LoadPageReturn } from '$lib/components/PagedList.svelte';
	import { user, cl, apiOpts, cacheFetch } from '$lib/util';
	import { onDestroy, onMount } from 'svelte';
	import SendPacket from '$lib/components/SendPacket.svelte';
	import PagedList from '$lib/components/PagedList.svelte';
	import TimeBox from '$lib/components/TimeBox.svelte';

	let list: undefined | PagedList;
	let chat = document.location.pathname.split('/')[2] || 'livechat';

	async function loadPage(): Promise<LoadPageReturn> {
		if (chat !== 'home' && $user == null) {
			document.location.assign(
				`/login?redirect=${encodeURIComponent(
					window.location.pathname + '/chats/' + chat
				)}`
			);
			return { numPages: 0, result: [] };
		}
		let endpoint =
			chat == 'home' ? 'v1/home/latest' : `v1/chats/${chat}/messages`;
		const resp = await cacheFetch(`${apiOpts.apiBaseUrl}${endpoint}`, {
			headers: {
				Authorization: `${$user?.token}`
			}
		});

		if (!resp.ok) {
			throw new Error('Response code is not OK; code is ' + resp.status);
		}

		return {
			numPages: 1,
			result: (await resp.json()).map((post: Item) => ({
				...post,
				id: post.id
			})) as Item[]
		};
	}

	onMount(() => {
		$cl.on(
			chat == 'home' ? 'post_created' : 'message_created',
			(packet: MessagePacket) => {
				if (!packet.val || list == null) return;
				if (typeof packet.val == 'string') packet.val = JSON.parse(packet.val);
				list.addItem({
					...(packet.val as Message),
					id: packet.val.id
				});
			}
		);

		let subscribe = async () => {
			await $cl.send({
				cmd: 'subscribe',
				// @ts-ignore
				type: chat == 'home' ? 'new_posts' : 'posts',
				id: chat == 'home' ? undefined : chat
			});
		};
		// @ts-ignore
		if ($cl.status == 1) {
			subscribe();
		} else {
			$cl.on('open', subscribe);
		}
	});

	onDestroy(() => {
		$cl.send({
			cmd: 'unsubscribe',
			type: chat == 'home' ? 'new_posts' : 'posts',
			val: null
		} as SubscribePacket);
	});
</script>

<div class="layout">
	<SendPacket {chat} />
	<PagedList bind:this={list} {loadPage}>
		<container slot="item" let:item={post}>
			<div>
				<div class="post-author">
					<img
						alt="{post.author.username}'s profile picture"
						src="{apiOpts.apiBaseUrl}v1/profiles/{post.author.username}.png"
						width="50px"
					/>
					<h2>{post.author.username}</h2>
					<TimeBox date={post.time} />
				</div>

				<p>{post.content}</p>
			</div>
		</container>
	</PagedList>
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
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

	container > div {
		background-color: var(--background);
		border: solid 2px var(--orange);
		border-radius: 1px;
		padding: 0.6em;
		margin-bottom: 0.4em;
	}
</style>
