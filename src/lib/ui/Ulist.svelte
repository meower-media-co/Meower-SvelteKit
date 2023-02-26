<script lang="ts">
	import {getContext} from "svelte";
	import type CloudlinkClient from "@williamhorning/cloudlink"
	import type {CurrentUser} from "$lib/meower-types";
	import type {Writable} from "svelte/store";

	const cl: CloudlinkClient = getContext("cl");
	var UString: String = "";
	cl.on("ulist", () => {
		if (cl.ulist != null) {
			UString = cl.ulist?.join(", ").toString();
		}
	});

	const user: Writable<CurrentUser | null> = getContext("user");


</script>

<ulist class="userlist">
	<p style="">
		There are currently {UString.split(", ").length} users online ({UString}).
	</p>
</ulist>

<style lang="scss">
	.userlist {
		margin-bottom: 0.5em;
		text-align: center;
		align-items: center;
		justify-content: center;
	}
</style>
