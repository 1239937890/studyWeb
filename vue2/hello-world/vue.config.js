const {
  defineConfig
} = require('@vue/cli-service')
const path = require('path');
const packageInfo=require('./package.json');
const resolve = (dir) => {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  // 执行 npm run build 统一配置文件路径（本地访问dist/index.html需'./'）
  // NODE_ENV：Node.js 暴露给执行脚本的系统环境变量。通常用于确定在开发环境还是生产环境
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static', // 放置静态资源
  transpileDependencies: true, //在使用Babel进行编译时，将依赖项也进行转译
  lintOnSave: false, //关闭语法检查
  productionSourceMap: false,// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  // alias 别名配置
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = packageInfo.description;
      return args;
    });
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('components', path.join(__dirname, 'src/components'));
  },
  // devServer: {
  //   // 本地端口号
  //   port: 8099,
  //   // 项目启动后是否自动打开浏览器
  //   open: true,
  //   // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
  //   overlay: {
  //     warnings: false,
  //     errors: true,
  //   },
  //   // proxy: {
  //   //   '/api': {
  //   //     target: 'https://blog.csdn.net',
  //   //     pathRewrite: {
  //   //       '^/api': ''
  //   //     },
  //   //     ws: true,
  //   //     // changeOrigin设置为true时，服务器收到的请求头中的host会与服务器一样
  //   //     // changeOrigin设置为false时，服务器收到的请求头中的host为真实的请求来源地址
  //   //     // changeOrigin默认值为true
  //   //     changeOrigin: true
  //   //   }
  //   // }
  //   // disableHostCheck: true,
  // }
})