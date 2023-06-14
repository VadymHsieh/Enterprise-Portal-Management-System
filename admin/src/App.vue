<template>
  <router-view/>
</template>

<script setup>
//element-plus 报错 ResizeObserver loop limit exceeded 解决
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
</script>

<style lang="scss">
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
