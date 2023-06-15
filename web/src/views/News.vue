<template>
    <div class="container">
        <div class="news-header" :style="{
            backgroundImage:`url(${require('@/assets/newsbg.jpg')})`
        }"></div>

        <div class="search">
            <el-popover
                placement="bottom"
                title="检索结果"
                width="50%"
                :visible = "visible"
            >
                <template #reference>
                    <el-input
                        v-model="searchText"
                        class="w-50 m-2"
                        placeholder="请输入新闻关键字"
                        :prefix-icon="Search"
                        type="search"
                        size="large"
                        @input="visible=true"
                        @blur="visible=false"
                    />
                </template>
                <div v-if="searchnewslist.length">
                    <div v-for="data in searchnewslist"
                        :key="data._id"
                        class="search-item"
                        @click="handleChangepage(data._id)"
                    >{{ data.title }}</div>
                </div>
                <div v-else>
                    <el-empty description="暂无相关新闻, 换个关键词试试吧" :image-size="50"/>
                </div>
            </el-popover>
        </div>
        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6"
                    v-for="item in topNewsList"
                    :key="item._id"
                >
                    <el-card 
                        shadow="hover" 
                        :body-style="{ padding: '0px' }"
                        @click="handleChangepage(item._id)"
                    >
                        <div class="image"
                            :style="{
                                backgroundImage:`url(http://localhost:3000${item.cover})`
                            }"
                        ></div>
                        <div style="padding: 14px">
                        <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ whichTime(item.editTime) }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <el-tabs v-model="whichTab" class="demo-tabs">
            <el-tab-pane
                :key="item.name"
                v-for="item in tablist"
                :label="item.label" 
                :name="item.name"
            >
                <el-row :gutter="20">
                    <el-col
                        :span="18"
                    >
                        <div
                            v-for="data in tabnews[item.name]"
                            :key="data._id"
                            class="demo-tabs"
                        >
                            <el-card 
                                shadow="hover" 
                                :body-style="{ padding: '0px' }"
                                @click="handleChangepage(data._id)"
                            >
                                <div class="tab-image"
                                    :style="{
                                        backgroundImage:`url(http://localhost:3000${data.cover})`
                                    }"
                                ></div>
                                <div style="padding: 14px;float: left;">
                                <span>{{ data.title }}</span>
                                    <div class="bottom">
                                        <time class="tab-time">{{ whichTime(data.editTime) }}</time>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-timeline>
                            <el-timeline-item
                                v-for="(data, index) in tabnews[item.name]"
                                :key="index"
                                :timestamp="whichTime(data.editTime)"
                            >
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-backtop :visibility-height="100" :right="100" :bottom="100" />
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref,onMounted,computed } from 'vue'
import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
import { useRouter } from 'vue-router'

moment.locale("zh-cn")
const searchText = ref("")
const visible = ref(false)
const newslist = ref([])
const whichTab = ref(1)

onMounted(async () => {
    var res = await axios.get("/webapi/news/list")
    // console.log(res.data)
    newslist.value = res.data.data
    // console.log(_.groupBy(newslist.value,item=>item.category))
})

const searchnewslist = computed(()=>
searchText.value?
newslist.value.filter(item=>item.title.
includes(searchText.value)):[])

const topNewsList = computed(() =>
newslist.value.slice(0,4))

const whichTime = time =>{
    return moment(time).format("lll")
}

const tablist = [
    {
        label:"最新动态",
        name:1
    },
    {
        label:"典型案例",
        name:2
    },
    {
        label:"通知公告",
        name:3
    }
]

const tabnews = computed(() => _.groupBy(newslist.value,item=>item.category))

const router = useRouter()
const handleChangepage = (id) => {
    // console.log(id)
    router.push(`/news/${id}`)
}

</script>

<style lang="scss" scoped>
.container{
    position: relative;
}

.news-header{
    width: 100%;
    height: 400px;
    background-size: cover;
}

.search{
    position: absolute;
    top: 335px;
    width: 100%;
    text-align: center;
    .el-input{
        width: 50%;
    }
}
.search-item{
    height: 50px;
    line-height: 50px;
    &:hover{
        background: whitesmoke;
        color: blue;
    }
}
.topnews{
    margin: 20px;
    .image{
        widows: 100%;
        height: 150px;
        background-size: cover;
    }
    .time{
        font-size: 13px;
        color: gray;
    }
}
.demo-tabs{
    margin: 20px;
}
.tab-image{
    width: 150px;
    height: 100px;
    background-size: cover;
    float: left;
}
.tab-time{
    font-size: 13px;
    color: gray;
}
</style>