<script lang='ts'>
    import type CloudLink from "$lib/cloudlink/cloudlink";
    import { getContext } from "svelte";

    const cl: CloudLink = getContext("cl");

    let post = '';

    function sendPost() {
        cl.send({
            cmd: "direct",
            val: {
                cmd: "post_home",
                val: post
            }
        })

        post = '';

        // clear the input
        const input: HTMLInputElement | null = document.querySelector('input[type="text"]');
        if (input) input.value = '';
    }
</script>

<form on:submit|preventDefault={sendPost}>
    <input type="text" bind:value={post} />
    <input type="submit" value="Post" />
</form>
