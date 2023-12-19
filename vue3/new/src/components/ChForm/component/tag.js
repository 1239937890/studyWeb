import { ElSelect, ElOption, ElInput } from 'element-plus';
import { createVNode } from 'vue';
const createOptionVNodes = (arr) => {
	return arr.map(({ dictValue, dictLabel }) => {
		return createVNode(ElOption, { value: dictValue, label: dictLabel });
	});
};
export const useTag = () => {
	const createTag = (el, context, options) => {
		return createVNode(el, { ...context.attrs }, { default: () => options || null });
	};
	const ActivityTag = (props, context) => {
		console.log('context>>>>>', context);
		const handleTypeText = props.type === 'input' ? '请输入' : '请选择';
		context.attrs['placeholder'] = `${handleTypeText}${props.label}`;
		if (props.type === 'select') {
			context.attrs['style'] = 'width: 100%';
			const source = props.source || [];
			const options = createOptionVNodes(source);
			return createTag(ElSelect, context, options);
		} else if (props.type === 'input') {
			return createTag(ElInput, context);
		}
	};
	return {
		ActivityTag,
	};
};
