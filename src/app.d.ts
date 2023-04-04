import type CloudlinkClient from '@williamhorning/cloudlink';
import type { CurrentUser } from '$lib/meower-types';
import type { Writable } from 'svelte/store';
import type { ApiOpts } from '$lib/util';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	namespace SvelteKit {
		const cl: Writable<CloudlinkClient>;
		const user: Writable<CurrentUser | null>;
		function getStore<T>(store: Writable<T>): T;
		const apiOpts: ApiOpts;
	}
}

export {};
