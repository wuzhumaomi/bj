const path = require('path')
const defaultSettings = require('./src/settings.js')

const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : ''

const resolve = dir =>path.join(__dirname, dir)

// webpackConfig.module
//   .rule('svg')
//   .test(/\.(svg)(\?.*)?$/)
//   .use('file-loader')
//   .loader('file-loader')
//   .options({
//     name: genAssetSubPath('img')
//   })

module.exports = {
  lintOnSave: false,//是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
  publicPath: BASE_URL,
  // baseUrl: BASE_URL,//根路径
  outputDir:'dist',//打包的时候生成的一个文件名
  chainWebpack: config => {
    config.module
      .rule('svg')
      .uses.clear()
    config.module
      .rule('svg1')
      .test(/\.svg$/)
      .use('svg-sprite')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
      .include
        .add(resolve('src/icons'))
        .end()
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打宝石不生成.map文件
  productionSourceMap: false,
  // 跨域配置
  devServer: {
    port: 9999,
    host: 'localhost',
    // open: true, //配置自动启动浏览器
    // proxy: 'http://192.168.2.163:8080', // 配置跨域处理,只有一个代理
    // 配置多个代理
    proxy: {
      "": {
        // target: "http://localhost:8080",
        target: "http://172.23.34.2:8080",
        ws: true, //代理的WebSockets
        changeOrigin: true//是否跨域
      }
    }
  }
}
