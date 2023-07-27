<template>
	<footer>
		<div>
			<div class="row">
				<span>版权所有：{{ zbdw }}</span>
				<span v-if="dz">&emsp;&emsp;地址：{{ dz }}</span>
				<span>&emsp;&emsp;电话：{{ tel }}</span>
			</div>
			<div class="row">
				<span>ICP备案号：</span>
				<span class="icp" @click="openLink('https://beian.miit.gov.cn/#/Integrated/index')">{{ ICP }}</span>
				<span>&emsp;&emsp;技术支持：{{ COMPANY }}</span>
			</div>
		</div>
		<img
			class="pic_1"
			@click="openLink('http://bszs.conac.cn/sitename?method=show&id=27ED16550D956BBEE053022819AC9907')"
			src="@/assets/images/common/dzjg.png"
			alt=""
		/>
		<img src="@/assets/images/common/ga.png" alt="" />
		<img
			class="pic_3"
			@click="
				openLink(
					'https://zfwzgl.www.gov.cn/exposure/jiucuo.html?site_code=3208000001&url=http%3A%2F%2Fwww.huaian.gov.cn%2Findex.html'
				)
			"
			src="@/assets/images/common/zhaocuo.png"
			alt=""
		/>
	</footer>
</template>
<script setup>
import useSystem from '@/store/modules/system';
const { zbdw, dz, ICP, COMPANY, tel } = storeToRefs(useSystem());
const openLink = (url) => {
	window.open(url, '_bank');
};
</script>
<style lang="scss" scoped>
footer {
	@include flex;
	padding: 6px 0;
	background-color: #3592f1;
	.row {
		text-align: center;
		font-size: 16px;
		color: #ffffff;
		.icp {
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
	}

	.pic_1 {
		@include w-h(75px, 75px);
		cursor: pointer;
	}

	.pic_3 {
		margin-left: 24px;
		cursor: pointer;
	}
}
</style>
