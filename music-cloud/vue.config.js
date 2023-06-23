const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false, // build 不生成.map文件
  configureWebpack: {
    // mode: "production",
  },
  devServer: {
    // 代理, 开发服务器
    proxy: {
      // 确定一个匹配的 格式
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true, // 开启代理
        ws: true,
        pathRewrite: {
          // 请求路径替换
          ['^/api']: "",
        },
      },
    },
  }
});
