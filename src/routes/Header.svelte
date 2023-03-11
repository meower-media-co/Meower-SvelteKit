<script lang="ts">
	import { user, cl } from '$lib/util';

	function logout() {
		user.set(null);
		$cl.disconnect();
		$cl.connect();
	}
</script>

<header>
	<div class="corner">
		<nav>
			<ul>
				<li
					aria-current={document.location.pathname === '/' ? 'page' : undefined}
				>
					<a href="/">Home</a>
				</li>
				{#if $user !== null}
					<li
						aria-current={document.location.pathname.startsWith('/chats')
							? 'page'
							: undefined}
					>
						<a href="/chats">Chats</a>
					</li>
					<li class="side-right">
						<a
							href="/"
							on:click|preventDefault={function () {
								logout();
								return 0;
							}}>Logout</a
						>
					</li>
				{:else}
					<li
						aria-current={document.location.pathname === '/login'
							? 'page'
							: undefined}
						class="side-right"
					>
						<a href="/login?redirect=/">Login</a>
					</li>
				{/if}
			</ul>
		</nav>
	</div>
</header>

<style lang="scss">
	header {
		background: var(--orange-button);
		color: var(--white);
		padding: 1rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		margin-left: 1rem;
	}

	li {
		display: inline-block;
		margin-right: 1em;
	}

	.side-right {
		float: right;
	}

	a {
		color: #fff;
		text-decoration: none;
	}
</style>
