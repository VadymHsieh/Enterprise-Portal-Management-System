<template>
    <div class="container">
        <el-carousel height="calc(100vh - 80px)">
            <el-carousel-item :key="1">
                <div :style="{backgroundImage:`url(${require('@/assets/home1.png')})`}"></div>
            </el-carousel-item>
            <el-carousel-item :key="2">
                <div :style="{backgroundImage:`url(${require('@/assets/home2.png')})`}"></div>
            </el-carousel-item>
            <el-carousel-item :key="3">
                <div :style="{backgroundImage:`url(${require('@/assets/home3.png')})`}"></div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style lang="scss" scoped>
.el-carousel div{
    width: 100%;
    height: 100%;
    background-size: cover;
}
.demonstration {
  color: var(--el-text-color-secondary);
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>