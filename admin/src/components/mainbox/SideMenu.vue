<template>
  <el-aside :width="$store.state.isCollapsed ? '64px' : '200px'">
    <!-- 侧边栏 -->
    <el-menu
      :collapse="$store.state.isCollapsed"
      :collapse-transition="false"
      :router="true"
      :default-active="route.fullPath"
    >
      <el-menu-item index="/index">
        <el-icon><home-filled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon><avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <!-- 二级菜单 用户管理 -->
      <!-- v-admin 根据用户权限进行访问权限设置 -->
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon><user-filled /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <!-- 二级菜单 新闻管理 -->
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon><message-box /></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news-manage/addnews">发布新闻</el-menu-item>
        <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
      </el-sub-menu>
      <!-- 二级菜单 产品管理 -->
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon><reading /></el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
        <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Reading,
  Pointer,
} from "@element-plus/icons-vue";

import { useRoute } from "vue-router"
import { useStore } from "vuex"
const route = useRoute();

const store = useStore()

//定义局部指令 创建生命周期
//访问dom操作 封装指令
const vAdmin = {
  mounted(el){
    // console.log(el)
    //判断用户权限
    if(store.state.userInfo.role!==1){
      // 隐藏dom操作
      el.parentNode.removeChild(el)
    }
  }
}

</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;

  .el-menu {
    height: 100vh;
  }
}
</style>>