<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
</script>

<PostList chat={document.location.pathname.split('/')[2] || 'livechat'} />
