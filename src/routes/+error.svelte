<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Meower Media</title>
</svelte:head>

<div class="mktn">
	<h1>Error - {$page.error.message}</h1>
	<h2>{$page.error.message}</h2>
</div>
