const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8889,
    proxy:{
      //配置反向代理 隐藏后端
      "/webapi":{
        target:"http://localhost:3000",
        changeOrigin:true
      }
    }
  }
})
