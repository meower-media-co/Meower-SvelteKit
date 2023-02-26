<script lang="ts">
	import cacheFetch from '$lib/util/cacheFetch';
	import type { User } from '$lib/meower-types';
	import {goto} from "$app/navigation";

	import type CloudlinkClient from "@williamhorning/cloudlink"
	import PopupHome from "$lib/components/PopupHome.svelte";
	import type {CurrentUser} from "$lib/meower-types";
	import {apiUrl} from "$lib/urls";
	import {getContext} from "svelte";
	import type {Writable} from "svelte/store";
	const cl: CloudlinkClient = getContext("cl");
	const user: Writable<CurrentUser | null> = getContext("user");
	

	let username = "";
	let pswd = "";
	let agree = false;
	async function RegisterCallback() {
		if (!agree) {
			alert("You must agree to the terms of service!");
		}

		const resp = await fetch(apiUrl + "v1/auth/register", {
			method: "POST",
			
			//cors

			body: JSON.stringify ({
				username: username,
				password: pswd,
				child: false
			})
		})

		if (!(resp.status == 200)) {
			alert("Signup failed:" + resp.status + "\n" + await resp.text());
			throw new Error("Signup failed");
		}


		const data = await resp.json();

		const profile: User | {"error": true, "code": Number,"message": String} = await (
			await cacheFetch(apiUrl + "v1/users/" + data.user_id)
		).json() 
		

		//@ts-ignore ts(2339)
		if (profile.error === true) {
			//@ts-ignore ts(2339)
			throw new Error(profile.message);
		}

		//@ts-ignore 
		if (cl._websocket.readyState == 1) {
		cl.send({
			"cmd": "authenticate",
			val: data['access_token']
		})
	    } else {
			cl.on("open", () => {
				cl.send({
					"cmd": "authenticate",
					val: data['access_token']
				})
			})
		}

		

		user.set({
			...profile as User,
			token: data['access_token']
		});
	}
</script>

<PopupHome title="signup">
	<svelte:fragment slot="content">
		<form
			on:submit={async () => {
				await RegisterCallback();
			}}
		>
			<input type="text" bind:value={username} />
			<br />
			<input type="password" bind:value={pswd} />
			<br />
			<!-- Agree to TOS -->
			<p>
				<input type="checkbox" bind:checked={agree} /> I agree to the
				<a href="https://meower.org/legal">Terms of Service</a>
			</p>
			<br />
			<button type="submit">Sign up</button>
		</form>
	</svelte:fragment>
</PopupHome>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
	}

	input {
		margin: 0.3rem;
		font-size: 1.2rem;
	}

	input[type="checkbox"] {
		display: inline;
		float: left;
	}

	p {
		text-align: center;

		display: block;
	}
</style>
