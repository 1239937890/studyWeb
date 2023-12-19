<template>
	<div>
		<el-form class="register_form" ref="registerRef" size="large" :label-width="labelWidth" :model="params" :rules="rules">
			<el-form-item :prop="prop" :label="label" v-for="{ type, prop, label, sourceData } in options">
				<ActivityTag v-model="params[prop]" :label="label" :type="type" :source="sourceData" />
			</el-form-item>
		</el-form>
	</div>
</template>
<script setup name="ChForm">
import { useTag } from './component/tag';
const { ActivityTag } = useTag();
const props = defineProps({
	labelWidth: {
		type: String,
		default: '120px',
	},
	options: {
		type: Array,
		default: [],
	},
	rules: {
		type: Object,
		default: () => {},
	},
});
watch(
	() => props.options,
	(val) => {
		console.log('options', val);
	},
	{
		deep: true,
		immediate: true,
	}
);
const getParams = () => {
	const e = {};
	props.options.forEach((item) => {
		e[item.prop] = item.default || '';
	});
	return e;
};
const params = reactive(getParams());
watch(
	() => params,
	(val) => {
		console.log('监听params', val);
	},
	{
		deep: true,
		immediate: true,
	}
);
</script>
