import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import CloudlinkClient from '@williamhorning/cloudlink';
import type { CurrentUser } from '$lib/meower-types';

export class ApiOpts {
	constructor() {}
	get cloudlink4Url() {
		return localStorage.getItem('meower_linkurl') || 'http://127.0.0.1:3001';
	}
	set cloudlink4Url(url: string) {
		localStorage.setItem('meower_linkurl', url);
	}
	get apiBaseUrl() {
		return localStorage.getItem('meower_apiurl') || 'http://127.0.0.1:3000';
	}
	set apiBaseUrl(url: string) {
		localStorage.setItem('meower_apiurl', url);
	}
	get encUrlParams() {
		return JSON.parse(localStorage.getItem('meower_encodeapi') || 'false');
	}
	set encUrlParams(encode: boolean) {
		localStorage.setItem('meower_encodeapi', JSON.stringify(encode));
	}
}

export const apiOpts = new ApiOpts();

export default function cacheStore(
	thingToCache: Writable<any>,
	localStorageKey: string
) {
	thingToCache.set(
		JSON.parse(String(localStorage.getItem(localStorageKey))) || thingToCache
	);
	thingToCache.subscribe((value) => {
		localStorage.setItem(localStorageKey, JSON.stringify(value));
	});
}

export const cl = writable<CloudlinkClient>(
	new CloudlinkClient({
		url: apiOpts.cloudlink4Url,
		log: true
	})
);

export const user = writable<CurrentUser | null>(null);

cacheStore(user, 'user');

export function handle32bitdate(dat: number, hour12: boolean = false) {
	let date = new Date(dat * 1000);
	return {
		date,
		timestamp: date.getTime(),
		// @ts-ignore
		text: date.toLocaleString(hour12 ? 'en-US' : 'en-GB'),
		iso: date.toISOString()
	};
}

export { get as getStore } from 'svelte/store';
export { default as cacheFetch } from './cacheFetch';
export { default as handleSubmit } from './login';
