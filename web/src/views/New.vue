<template>
    <el-row>
        <el-col
            :span="17"
            :offset="1"
        >
            <div>
                <h2>{{ currentNews.title }}</h2>
            </div>
            <div class="time">
                {{ whichTime(currentNews.editTime) }}
            </div>
            <div>
                <el-divider>
                    <el-icon><View /></el-icon>
                </el-divider>

                <div v-html="currentNews.content"></div>
            </div>
        </el-col>
        <el-col
            :span="4"
            :offset="1"
            :pull="1"
        >
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span 
                            style="font-size:16px;
                            font-weight:bold"
                        >最近新闻</span>
                    </div>
                </template>
                <div 
                    v-for="item in topNews" 
                    :key="item._id" 
                    class="text-item"
                    @click="handleChange(item._id)"
                >
                    <span>{{ item.title }}</span>
                    <div class="bottom">
                        <time class="time">{{ whichTime(item.editTime) }}</time>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import { onMounted,ref,watchEffect,onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRoute,useRouter } from 'vue-router'
import moment from 'moment'
import { View } from '@element-plus/icons-vue'

moment.locale("zh-cn")
const route = useRoute()
const router = useRouter()
const currentNews = ref({})
const topNews = ref([])

// 详情组件跳转详情组件 onMounted：没有组件的销毁和再创建，只是更新了当前组件
// 副作用函数 watchEffect，当依赖值发生改变，钩子回调会重新执行
const stop = watchEffect( async () =>{
    if(!route.params.id) return
    const res1 = await axios.get(`/webapi/news/list/${route.params.id}`)
    const res2 = await axios.get(`/webapi/news/toplist?limit=4`)
    // console.log(res2.data.data[0])
    currentNews.value = res1.data.data[0]
    topNews.value = res2.data.data
})

// onBeforeUnmount 当前id -> undefined 则return
onBeforeUnmount(() => {
    console.log("onBeforeUnmount")
    stop()
})

const whichTime = time =>{
    return moment(time).format("lll")
}

const handleChange = (id) => {
    router.push(`/news/${id}`)
}

</script>

<style lang="scss" scoped>
    .el-row{
        margin-top: 30px;
    }

    .time{
        font-size: 13px;
        color: gray;
    }
    .text-item{
        padding: 14px;
    }
</style>