<script lang="ts">
	import {getContext} from "svelte";
	import type CloudLink from "$lib/cloudlink/cloudlink";
    import type {PostPacket, Packet} from "$lib/cloudlink/cloudlink-types";

    import PagedList from "./PagedList.svelte";
	const cl: CloudLink = getContext("cl");

    let posts: Array<PostPacket> = [];
    
    let list: undefined | PagedList;

    cl.on("direct", (packet: PostPacket) => {
        if (packet.val.hasOwnProperty("post_origin"))  {
            if (list) list.addItem({
                ...packet
                
            });
        }
    });

</script>

{#if list}
 {#each posts as post}
  {post.val.u}: {post.val.p}
  <br>
 {/each}
{/if}

<PagedList bind:this={list} bind:items={posts} />