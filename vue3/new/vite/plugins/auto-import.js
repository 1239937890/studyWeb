import autoImport from 'unplugin-auto-import/vite';
const createAutoImport = () => {
	return autoImport({
		imports: ['vue', 'vue-router', 'pinia'],
		dts: false,
	});
};
export default createAutoImport;
