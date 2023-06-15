const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //配置devServer
  devServer: {
    host: 'localhost',
    port: 8888,
    proxy:{
      //配置反向代理 隐藏后端
      "/adminapi":{
        target:"http://localhost:3000",
        changeOrigin:true
      }
    }
  }
})
