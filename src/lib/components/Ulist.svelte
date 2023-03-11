<script lang="ts">
	import { cl } from '$lib/util';
</script>

<ulist class="userlist">
	<p>
		There are currently {$cl.ulist?.length || '0'} users online: {(
			$cl.ulist || []
		).join(', ')}
	</p>
</ulist>

<style lang="scss">
	.userlist {
		margin-bottom: 0.5em;
		text-align: center;
		align-items: center;
		justify-content: center;
	}
</style>
