<template>
    <div>
        <el-card>
            <el-page-header content="新闻列表" icon="" title="新闻管理"/>

            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column 
                    prop="category" 
                    label="分类"
                >
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>

                <el-table-column 
                    label="更新时间" 
                >
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column 
                    label="是否发布" 
                >
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish"
                        :active-value="1"
                        :inactive-value="0"
                        @change="handleSwitchChange(scope.row)"
                        />
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <!-- 预览 -->
                        <el-button
                            circle
                            :icon="View"
                            @click="handlePreview(scope.row)"
                        ></el-button>
                        <!-- 编辑 -->
                        <el-button
                            circle
                            :icon="Edit"
                            type="success"
                            @click="handleEdit(scope.row)"
                        ></el-button>
                        <!-- 删除 -->
                        <el-popconfirm 
                            title="你确定要删除该条数据吗？?"
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)"
                        >
                            <template #reference>
                                <el-button
                                    circle
                                    :icon="Delete"
                                     type="danger"
                                ></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 对话框：用于预览新闻 -->
        <el-dialog
            v-model="dialogVisible"
            title="预览新闻"
            width="50%"
        >
            <div>
                <!-- 预览：标题 -->
                <h2>{{ previewData.title }}</h2>
                <div style="font-size:12px;color:grey">
                    <!-- 预览：更新时间 -->
                    {{ formatTime.getTime(previewData.editTime) }}
                    <!-- 预览分割线 -->
                    <el-divider>
                        <el-icon>
                            <View />
                        </el-icon>
                    </el-divider>
                    <!-- 预览：正文 -->
                    <!-- {{}}语法会对HTML片段进行转译显示,防止跨站脚本攻击 -->
                    <!-- 使用正则表达式去除HTML标签 {{ previewData.content.replace(/<\/?.+?\/?>/g,'') }} -->
                    <!-- 只有对后端访问数据信任的情况下,可使用v-html预览数据 -->
                    <div v-html="previewData.content" class="htmlcontent">
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import axios from 'axios'
import formatTime from '@/util/formatTime'
import {
 View,
 Edit,
 Delete
} from "@element-plus/icons-vue"
import { useRouter } from 'vue-router'

const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)
const router = useRouter()
//获取新闻列表
onMounted(() => {
    getTableData()
}) 
const getTableData = async()=> {
    const res = await axios.get(`/adminapi/news/list`)
    // console.log(res.data.data)
    tableData.value = res.data.data
}

//格式化分类信息
const categoryFormat = (category) => {
    const arr = ["最新动态","典型案例","通知公告"]
    return arr[category-1]
}

//发布开关回调
const handleSwitchChange = async (item) => {
    // console.log(item)
    await axios.put(`/adminapi/news/publish`,{
        _id:item._id,
        isPublish:item.isPublish
    })
    await getTableData()
}

//预览按钮回调
const handlePreview = (data) => {
    //console.log(data)
    previewData.value=data
    dialogVisible.value = true
}

//删除按钮回调
const handleDelete = async (item) => {
    // console.log(item)
    await axios.delete(`/adminapi/news/list/${item._id}`)
    await getTableData()
}

//编辑按钮回调
const handleEdit = (item) => {
    //跳转到/news-manage/editnews/:id

    router.push(`/news-manage/editnews/${item._id}`)
}
</script>

<style lang="scss" scoped>
.el-table{
    margin-top: 50px;
}

::v-deep .htmlcontent{
    img{
        max-width: 100%;
    }
}
</style>