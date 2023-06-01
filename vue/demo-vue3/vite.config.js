import {
  defineConfig
} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import {
  VantResolver
} from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [VantResolver()],
    })
  ],
  resolve: {
    //当使用文件系统路径的别名时，请始终使用绝对路径。相对路径的别名值会原封不动地被使用，因此无法被正常解析
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import "@/common/style/mixin.scss";`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    // proxy: {
    //   '/api': {
    //     target: 'https://mfkmpapi.39yst.com',
    //     changeOrigin: true
    //   }
    // }
    proxy: {
      '/v2': {
        target: 'https://restapi.getui.com',
        changeOrigin: true
      }
    }
  }
})