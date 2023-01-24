<script lang="ts">
	import { linkUrl } from '$lib/urls';
	import { User } from '$lib/meower-types';
	import { writable } from 'svelte/store';
	import { page } from "$app/stores"; // Do we need the page store?
	import logo from "$lib/images/svelte-logo.svg";
	import github from "$lib/images/github.svg";

	import { getContext } from "svelte";

	var user: writable<User | null> = getContext("user");
	const cl: CloudLink = getContext("cl");
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
				</li>
				
				  <li aria-current={$page.url.pathname === "/login" ? "page" : undefined}>
					<a href="/login">Login</a>
				  </li>
	
			</ul>
		</nav>
	</div>
</header>
