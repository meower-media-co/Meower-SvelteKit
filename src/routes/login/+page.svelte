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

<form on:submit|preventDefault={(e) => handleSubmit(e, type, $cl, user)}>
	<input type="text" name="username" />
	<br />
	<input type="password" name="password" />
	<br />
	{#if type == 'register'}
		<p>
			<input type="checkbox" required /> I agree to the
			<a href="https://meower.org/legal">Terms of Service</a>
		</p>
		<br />
	{/if}
	<button type="submit">{title}</button>
	<a on:click={changetype} on:keypress={changetype} href="?">{text}</a>
</form>
