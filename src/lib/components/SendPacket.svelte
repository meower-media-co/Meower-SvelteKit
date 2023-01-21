<script lang='ts'>
    import {getContext} from "svelte";
	import type CloudLink from "$lib/cloudlink/cloudlink";

    const cl: CloudLink = getContext("cl");
    var message = "";

    function send() {
        cl.send((JSON.parse(message)));
        message = "";

        //clear the input field
        var input = document.querySelector("input");
        if (input) {
            input.value = "";
        }
    }
    
    // send a message to the server every time the user clicks the button;



        
</script> 

<form on:submit|preventDefault={send}>
    <input type="text" bind:value={message} />
    <button type="submit">Send</button>
</form>