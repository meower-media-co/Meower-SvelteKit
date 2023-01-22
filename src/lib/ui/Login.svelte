<script lang="ts">
	import type { ModeRequestReturn } from './../cloudlink/cloudlink-types';
	import { getContext, setContext } from 'svelte';
    import type Cloudlink  from '$lib/cloudlink/cloudlink';
    
    const cljs: Cloudlink = getContext('cl');

    let username: string = '';
    let pswd: string = '';

    export let authed: boolean = false;

    async function SubmitCallback() {
        const Packets: ModeRequestReturn = await cljs.modeRequest({
            cmd: 'direct',
            val: {
                cmd: 'authpswd',
                val: {
                    username: username,
                    pswd: pswd
                }
            }
        }, 'auth');

        if (!Packets.ok) {
           throw new Error('Login failed');
        }
        // @ts-ignore 2339
        
        localStorage.setItem('user', Packets.payload);
        authed = true;
    }

</script>

<div>

    <form on:submit|preventDefault={async () => {
        await SubmitCallback();
    }}>
        <input type="text" bind:value={username} />
        <input type="password" bind:value={pswd} />
        <input type="submit" value="Login" />
    </form>
    
</div>
