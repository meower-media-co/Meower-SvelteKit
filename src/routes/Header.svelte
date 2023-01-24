<script lang="ts">
	import { page } from "$app/stores"; // Do we need the page store?
	import logo from "$lib/images/svelte-logo.svg";
	import github from "$lib/images/github.svg";
</script>

<header>
	<div class="corner">
		<nav>
			<ul>
				<li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
					<a href="/">Home</a>
				</li>
				<li aria-current={$page.url.pathname === "/about" ? "page" : undefined}>
					<a href="/changelog">ChangeLog</a>
			</ul>
		</nav>
	</div>
</header>
