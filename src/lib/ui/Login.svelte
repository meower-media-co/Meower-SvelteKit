<script lang="ts">
	
	import {getContext, setContext} from "svelte";
	import type {Writable} from "svelte/store";	
	import type CloudlinkClient from "@williamhorning/cloudlink"

	import cacheFetch from "$lib/util/cacheFetch";
	import type {User, CurrentUser} from "$lib/meower-types";
	import { apiUrl } from "$lib/urls";

	const cljs: CloudlinkClient = getContext("cl");
	const user: Writable<CurrentUser | null> = getContext("user");

	let username: string = "";
	let pswd: string = "";

	async function SubmitCallback() {
		
		const resp = await fetch(apiUrl + "v1/auth/password", {
			method: "POST",
			body: JSON.stringify({
				username: username,
				password: pswd
			})
		})

		if (!resp.ok) {
			throw new Error("Login failed");
		}

		const data = await resp.json();

		const profile: User | {"error": true, "code": Number,"message": String} = await (
			await cacheFetch(apiUrl +'v1/users/' + data.user_id)
		).json() 
		

		//@ts-ignore ts(2339)
		if (profile.error === true) {
			//@ts-ignore ts(2339)
			throw new Error(profile.message);
		}

		cljs.send({
			"cmd": "authenticate",
			val: data['access_token']
		})

		

		user.set({
			...profile as User,
			token: data['access_token']
		});
	}
</script>

<div>
	<form
		on:submit|preventDefault={async () => {
			await SubmitCallback();
		}}
	>
		<input type="text" bind:value={username} />
		<br />
		<input type="password" bind:value={pswd} />
		<br />
		<input type="submit" value="Login" />
	</form>

	or<a href="/register">register</a>
</div>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
	}

	input {
		margin: 0.3rem;
		font-size: 1.2rem;
	}
</style>
