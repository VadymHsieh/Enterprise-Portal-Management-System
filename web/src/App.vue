<template>
  <Navbar/>
  <router-view/>
</template>

<script setup>
import Navbar from '@/components/mainbox/Navbar'

</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}

//设置滚动条宽度 高度 定位
::-webkit-scrollbar{
  width: 5px;
  height: 5px;
  position: absolute;
}

//滚动条选中颜色
::-webkit-scrollbar-thumb{
  background: #4893d5;
}

//滚动挑未被选中颜色
::-webkit-scrollbar-track{
  background: #ddd;
}
</style>
