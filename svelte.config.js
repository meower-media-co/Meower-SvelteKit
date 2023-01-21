import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;
// NPM

// i alr installed Scss

// but when I did it it said it added 2 packages
// ?


// wait my consoles are supost to be read only

// i added it to the repo so we can use it with preprocess
// i think