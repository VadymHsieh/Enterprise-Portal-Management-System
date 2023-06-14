//配置axios拦截器
//响应成功之前，先进入拦截器统一设置token
import axios from "axios"
//添加拦截器
axios.interceptors.request.use(function (config){
    //请求发出前拦截
    //发请求之前，从本地存储中取出token传给后端
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`

    //发送ajax
    return config;
},function (error) {
    //当请求错误，报告错误信息
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function (response) {
    //请求得到响应之前，经过response拦截器
    //执行对应响应数据动作

    //登录成功之后，将authorization set带token中
    const {authorization} = response.headers
    authorization && localStorage.setItem("token",authorization)
    return response;
}, function (error) {
    //当请求错误，报告错误信息
    const {status} = error.response
    if(status===401){
        localStorage.removeItem("token")
        window.location.href='#/login'
    }
    return Promise.reject(error);
});

