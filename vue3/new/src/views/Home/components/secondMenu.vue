<template>
	<ul>
		<li v-for="{ id, icon, title } in secondMenuList" :key="id">
			<img :src="icon" alt="" />
			<span>{{ title }}</span>
		</li>
	</ul>
</template>
<script setup>
import { secondMenuList } from './source';
</script>
<style lang="scss" scoped>
ul {
	@include flex;
	padding: $paddingZy;
	padding-top: 20px;
	padding-bottom: 20px;
	background-image: url('@/assets/images/home/baijuxing.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	li {
		@include flex;
		width: 25%;
		margin: 0 4px;
		padding: 24px 0;
		background-color: #fff;
		color: #666;
		cursor: pointer;
		img {
			@include w-h(47px, 49px);
		}
		span {
			margin-left: 6px;
			font-size: 24px;
			font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		}
		&:hover {
			background-color: #95cdfe;
			color: #ffffff;
		}
	}
}
</style>
