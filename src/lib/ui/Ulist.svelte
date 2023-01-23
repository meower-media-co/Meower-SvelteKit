<script lang="ts">
	import { getContext } from 'svelte';
    import type CloudLink from "$lib/cloudlink/cloudlink";
	import type { UlistPacket } from '$lib/cloudlink/cloudlink-types';
    
    const cl: CloudLink = getContext("cl");
    var UString: String = "";

    cl.on('ulist', (users: UlistPacket) => {
		UString = users.val.split(";").join(", ").toString();
	})
</script>

<ulist class="userlist">
    {UString}
</ulist>

<style lang="scss">
    .userlist {
        margin-bottom: 0.5em;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
</style>