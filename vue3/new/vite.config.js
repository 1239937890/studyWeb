import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import createVitePlugins from './vite/plugins';
export default defineConfig(({ mode, command }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		plugins: createVitePlugins(env, command === 'build'),
		resolve: {
			// https://cn.vitejs.dev/config/#resolve-alias
			alias: {
				// 设置路径
				'~': path.resolve(__dirname, './'),
				// 设置别名
				'@': path.resolve(__dirname, './src'),
			},
			// https://cn.vitejs.dev/config/#resolve-extensions
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import '@/assets/styles/mixin.scss';`,
				},
			},
		},
		server: {
			port: 8099,
			host: true,
			open: true,
			proxy: {
				[env.VITE_APP_BASE_API]: {
					// target: 'http://192.168.1.27:8080',
					target: 'https://k8s-wsxf.jschrj.com/prod-api',
					changeOrigin: true,
					rewrite: (path) => path.replace(RegExp(`^${env.VITE_APP_BASE_API}`), ''),
				},
			},
		},
	};
});
