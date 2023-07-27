<template>
	<div class="container">
		<FirstMenu />
		<QrCodeMenu />
	</div>
	<SecondMenu />
</template>
<script setup name="Home">
import FirstMenu from './components/firstMenu';
import SecondMenu from './components/secondMenu';
import QrCodeMenu from './components/qrCodeMenu';
</script>
<style lang="scss" scoped>
.container {
	flex: 1;
	position: relative;
	width: 100%;
}
</style>
