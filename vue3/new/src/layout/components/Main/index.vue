<template>
	<main :style="{ backgroundImage: `url(${currentBg})` }" :class="isHome ? 'margin_top' : 'margin_none'">
		<router-view />
	</main>
</template>
<script setup>
import { getPicByValue } from '@/common/handle';
import PICKEY from '@/common/configPicKey';
const { HOMEBG, LOGINBG, REGISTERBG } = PICKEY;
const BGARR = [HOMEBG, LOGINBG, REGISTERBG];
const route = useRoute();
const isHome = computed(() => {
	return route.name === 'Home';
});
const currentBg = ref('');
const filterKey = (key, cb) => {
	BGARR.forEach((item) => {
		if (item.includes(key.toLowerCase())) {
			cb = item;
		}
	});
	return cb;
};
const getCurrentBg = (val) => {
	const type = val === HOMEBG ? 'jpg' : 'png';
	currentBg.value = new URL(`../../../assets/images/config/${getPicByValue(val, type)}`, import.meta.url).href;
};
const BGKEY = computed(() => {
	return filterKey(route.name);
});
watch(
	BGKEY,
	(val) => {
		if (val) {
			getCurrentBg(val);
		}
	},
	{
		immediate: true,
	}
);
</script>
<style lang="scss" scoped>
main {
	flex: 1;
	display: flex;
	flex-direction: column;
	background-repeat: no-repeat;
	background-size: cover;
}
.margin_top {
	margin-top: -119px;
}
.margin_none {
	margin-top: 0px;
}
</style>
