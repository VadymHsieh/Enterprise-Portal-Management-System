<template>
    <div>
        <el-page-header content="首页" icon="" title="企业门户网站管理系统"/>

        <el-card class="box-card">
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="100" :src="avatarUrl" />
                </el-col>
                <el-col :span="20">
                    <h3 style="line-height:100px;">欢迎{{store.state.userInfo.username}}回来, {{ welcomeText }}</h3>
                </el-col>
            </el-row>
        </el-card>
        
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>公司产品</span>
                    <el-carousel 
                        v-if="loopList.length"
                        :interval="4000" 
                        type="card" 
                        height="350px">
                        <el-carousel-item v-for="item in loopList" :key="item._id">
                            <div class="roll" :style="{
                                backgroundImage:`url(http://localhost:3000${item.cover})`,
                                backgroundSize:'cover'
                            }">
                                <h3 text="2xl" justify="center">{{ item.title }}</h3>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed,onMounted,ref } from 'vue'
import axios from 'axios'

const store = useStore()
const loopList = ref([])

//当数据库用户存储数据有图片则使用数据库的图片，如果没有则用固定未知头像
const avatarUrl = computed(
    () => 
    store.state.userInfo.avatar
        ? 'http://localhost:3000'+store.state.userInfo.avatar
        : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png` 
);
//根据当前系统时间，显示不同的欢迎标题
const welcomeText = computed(() => new Date().getHours()<12?'祝你开启愉快的一天。':'已经坐很久了？休息一下吧。')

onMounted(() => {
    getTableData()
}) 
const getTableData = async()=> {
    const res = await axios.get(`/adminapi/product/list`)
    // console.log(res.data.data)
    loopList.value = res.data.data
    console.log(loopList.value)
}

</script>

<style lang="scss" scoped>
//卡片向上间距50px
.box-card{
    margin-top: 50px;
}

//走马灯样式
::v-deep .roll{
    height: 350px;
}
.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
