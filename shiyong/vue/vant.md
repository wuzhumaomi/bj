 \# 通过 npm 安装 

npm i vant -S 

 \# 安装插件 npm i babel-plugin-import -D 

 // 对于使用 babel7 的用户，可以在 babel.config.js 中配置 module.exports = {  plugins: [    ['import', {      libraryName: 'vant',      libraryDirectory: 'es',      style: true    }, 'vant']  ] }; 

