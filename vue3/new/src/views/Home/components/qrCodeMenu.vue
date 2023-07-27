<template>
	<div class="code_container">
		<el-popover placement="left" width="auto" trigger="hover" v-for="{ id, icon, label, title } in qrCodeList" :key="id">
			<div class="content_popover">
				<img :title="title" :src="icon" />
				<div class="text">{{ label }}</div>
			</div>
			<template #reference>
				<div class="content_right_box">
					<img :title="title" :src="icon" />
					<div>{{ label }}</div>
				</div>
			</template>
		</el-popover>
	</div>
</template>
<script setup>
import { qrCodeList } from './source';
</script>
<style lang="scss" scoped>
.code_container {
	position: absolute;
	top: 150px;
	right: 130px;
	opacity: 0.99;
	display: flex;
	flex-flow: column;
	padding-bottom: 18px;
	background-color: rgba(9, 116, 193, 0.5);
	border-radius: 8px;

	.content_right_box {
		@include flex;
		flex-direction: column;
		padding: 18px 18px 0px 18px;
		font-size: 14px;
		color: #fff;
		img {
			@include w-h(99px, 99px);
		}
	}
}
.content_popover {
	@include flex;
	flex-direction: column;
	font-size: 14px;
	img {
		@include w-h(300px, 300px);
	}
	.text {
		text-align: center;
	}
}
</style>
