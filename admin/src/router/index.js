import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import RoutesConfig from './config'
import store from '../store/index.js'

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox
  }
  //mainbox的嵌套路由，后面根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//路由拦截 每次跳转之前
router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next()
  } else {
    //如果授权登陆过 next()
    //未授权 重新定向到login
    if (!localStorage.getItem("token")) {
      next({
        path: "/login"
      })
    } else {
      if (!store.state.isGetterRouter) {
        //删除所有的嵌套路由
        //删除父路由mainbox达到清除所有子路由效果
        router.removeRoute("mainbox")
        ConfigRouter()
        next({
          path: to.fullPath
        })
      } else {
        next()
      }
    }
  }
})

const ConfigRouter = () => {
  //检查是否有mainbox路由
  if(!router.hasRoute("mainbox")){
    router.addRoute({
      path: "/mainbox",
      name: "mainbox",
      component: MainBox
    })
  }
  //根据权限添加路由
  RoutesConfig.forEach(item => {
    checkPermission(item) && router.addRoute("mainbox", item)
  })

  //改变isGetterRouter = true
  store.commit("changeGetterRouter", true)
}

//获取item读取用户权限，进行对应权限的路由访问操作
const checkPermission = (item) =>{
  if(item.requireAdmin){
    return store.state.userInfo.role===1
  }
  return true
}

export default router
