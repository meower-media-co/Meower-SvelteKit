<script lang="ts">
	import { logout, user } from '$lib/util';
</script>

<header>
	<a href={document.location.pathname.includes('/app') ? '/app' : '/'}>
		<img src="/logo.svg" alt="Meower" />
	</a>
	<nav>
		{#if !document.location.pathname.includes('/app')}
			<a href="https://forums.meower.org">Forums</a>
			<a href="https://github.com/meower-media-co">Github</a>
			<a
				aria-current={document.location.pathname.startsWith('/legal')
					? 'page'
					: undefined}
				href="/legal">Legal</a
			>
			<a href="https://wiki.meower.org">Wiki</a>
			<a href="/app">Sign in</a>
		{:else if $user !== null}
			<a
				aria-current={document.location.pathname.startsWith('/app/chats')
					? 'page'
					: undefined}
				href="/app/chats">Chats</a
			>
			<a href="/app" on:click|preventDefault={logout}>Logout</a>
		{:else}
			<a href="/app/login?redirect=/">Login</a>
		{/if}
	</nav>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
	}

	header > a > img {
		height: 2.25rem;
	}

	header > nav {
		display: flex;
	}

	header > nav > a {
		padding: 0.5rem 1.25rem;
		border-radius: 0.25rem;
	}

	header > nav > a[aria-current='page'] {
		color: #f9a535;
	}

	@media (max-width: 600px) {
		header {
			flex-direction: column;
		}

		header > a {
			margin-bottom: 1rem;
		}

		header > nav {
			flex-direction: row;
		}
	}
</style>
