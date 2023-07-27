<template>
	<ul>
		<li v-for="{ id, icon, title } in firstMenuList" :key="id">
			<img :src="icon" alt="" />
			<span>{{ title }}</span>
		</li>
	</ul>
</template>
<script setup>
import { firstMenuList } from './source';
</script>
<style lang="scss" scoped>
ul {
	position: absolute;
	transform: translateX(-50%);
	bottom: 24px;
	@include flex(space-between, center);
	margin-left: 50%;
	padding: 24px 0;
	width: 70%;
	// width: 90%;
	font-size: 33px;
	color: #fefefe;
	background-color: rgba(0, 134, 255, 0.67);
	border-radius: 10px;
	li {
		flex: 1;
		@include flex;
		border-right: 1px solid #fff;
		cursor: pointer;
		img {
			margin-right: 6px;
			@include w-h(40px, 40px);
		}
		span {
			font-family: Microsoft YaHei, Microsoft YaHei-Bold;
			font-weight: 700;
			white-space: nowrap;
		}
	}
	li:last-child {
		border-right: none;
	}
}
</style>
