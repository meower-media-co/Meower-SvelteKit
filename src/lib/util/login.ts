import { apiOpts, cacheFetch } from '$lib/util';
import type { User } from '$lib/meower-types';
import type CloudlinkClient from '@williamhorning/cloudlink';
import type { CurrentUser } from '$lib/meower-types';
import type { Writable } from 'svelte/store';

export default async function handleSubmit(
	e: SubmitEvent,
	type: 'password' | 'register',
	cl: CloudlinkClient,
	user: Writable<CurrentUser | null>
) {
	let form = new FormData(e.target as HTMLFormElement);
	let resp = await fetch(`${apiOpts.apiBaseUrl}v1/auth/${type}`, {
		method: 'POST',
		body: JSON.stringify({
			username: form.get('username'),
			password: form.get('password'),
			child: false
		})
	});
	if (!resp.ok) {
		alert(`Login/Signup failed: ${resp.status} ${resp.statusText}`);
		throw new Error('Signup failed');
	}
	let dat2 = await resp.json();
	let profile: User | { error: true; code: Number; message: String } = await (
		await cacheFetch(`${apiOpts.apiBaseUrl}v1/users/${dat2.user_id}`)
	).json();
	if (profile.hasOwnProperty('error')) {
		window.location.reload();
	}
	// @ts-ignore 2339 - types messed up
	if (cl.status == 1) {
		cl.send({
			cmd: 'authenticate',
			val: dat2['access_token']
		});
	} else {
		cl.on('open', () => {
			cl.send({
				cmd: 'authenticate',
				val: dat2['access_token']
			});
		});
	}

	user.set({
		...profile,
		token: dat2['access_token']
	});

	window.location.assign(
		decodeURIComponent(
			new URLSearchParams(window.location.search).get('redirect') || '/app'
		)
	);
}
