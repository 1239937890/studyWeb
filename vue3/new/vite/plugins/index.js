import vue from '@vitejs/plugin-vue';
import createAutoImport from './auto-import';
const createVitePlugins = (viteEnv, isBuild = false) => {
	const vitePlugins = [vue()];
	vitePlugins.push(createAutoImport());
	return vitePlugins;
};
export default createVitePlugins;
