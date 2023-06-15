<template>
    <div>
        <el-carousel
            height="calc(100vh - 80px)" 
            direction="vertical" 
            :autoplay="false"
            v-if="looplist.length"
        >
            <el-carousel-item 
                v-for="item in looplist" 
                :key="item._id">
                <div 
                    class="item"
                    :style="{backgroundImage:`url(http://localhost:3000${item.cover})`}"
                >
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <h2>{{ item.title }}</h2>
                            </div>
                        </template>
                        <div>
                            {{ item.introduction }}
                        </div>
                        <div class="detail">
                            {{ item.detail }}
                        </div>
                        <div class="more">
                            产品概念图
                        </div>
                    </el-card>
                </div>
            </el-carousel-item>
        </el-carousel>
        <el-empty description="暂无产品" v-else />
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref,onMounted } from 'vue'

const looplist = ref([])

onMounted(async() => {
    const res = await axios.get('/webapi/product/list')
    console.log(res)
    looplist.value = res.data.data
})
</script>

<style lang="scss" scoped>
.item{
    width: 100%;
    height: 100%;
    background-image: cover;
}
.box-card{
    width: 50%;
    height: 100%;
    background-color: rgba(255,255,255,0.7);
}
.detail,.more{
    margin-top: 20px;
}
</style>