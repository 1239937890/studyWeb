<template>
	<el-button :disabled="countdown != 0">
		<slot />
		<span v-if="countdown > 0">({{ countdown }})</span>
	</el-button>
</template>
<script setup>
const countdown = ref(0);
</script>
