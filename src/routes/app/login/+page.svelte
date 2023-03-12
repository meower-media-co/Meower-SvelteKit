<script lang="ts">
	import { user, cl, handleSubmit } from '$lib/util';

	export let type: 'register' | 'password' = 'password';
	let text =
		type == 'register' ? 'Already have an account?' : "Don't have an account?";
	let title = type == 'register' ? 'Sign up' : 'Login';

	function changetype() {
		type = type == 'register' ? 'password' : 'register';
		text =
			type == 'register'
				? 'Already have an account?'
				: "Don't have an account?";
		title = type == 'register' ? 'Sign up' : 'Login';
	}
</script>

<div class="mktn nopad">
	<h1>{title}</h1>
	<form on:submit|preventDefault={(e) => handleSubmit(e, type, $cl, user)}>
		<h2>username</h2>
		<br />

		<input type="text" name="username" />
		<br />
		<h2>password</h2>
		<br />
		<input type="password" name="password" />
		<br />
		{#if type == 'register'}
			<h2>TOS</h2>
			<h3>
				<input type="checkbox" required /> I agree to the
				<a href="https://meower.org/legal">Terms of Service</a>
			</h3>
		{/if}
		<br />
		<button type="submit">{title}</button>
		<br />
		<br />
		<h3>
			<a on:click={changetype} on:keypress={changetype} href="?">{text}</a>
		</h3>
	</form>
</div>
