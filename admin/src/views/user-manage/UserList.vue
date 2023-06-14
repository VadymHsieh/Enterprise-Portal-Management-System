<template>
    <div>
        <el-card>
            <el-page-header content="用户列表" icon="" title="用户管理"/>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column label="头像" width="180" >
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :siz="50" :src="'http://localhost:3000'+scope.row.avatar"></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                        </div>
                    </template>
                </el-table-column>
            
                <el-table-column label="权限" >
                    <template #default="scope">
                        <!-- {{ scope.row.role===1?'管理员':'编辑' }} -->
                        <el-tag
                            v-if="scope.row.role===1" 
                            class="ml-2" 
                            type="success"
                        >管理员</el-tag>
                        <el-tag
                            v-else
                        >编辑</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button 
                            size="small" 
                            @click="handleEdit(scope.row)"
                        >编辑</el-button>
                        <el-popconfirm 
                            title="你确定要删除该条数据吗？?"
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)"
                        >
                            <template #reference>
                                <el-button
                                    size="small"
                                    type="danger"
                                >删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 对话框：用于编辑修改所选用户资料 -->
        <el-dialog
            v-model="dialogVisible"
            title="编辑用户"
            width="50%"
        >
            <el-form
                ref="userFormRef"
                :model="userForm"
                :rules="userFormRules"
                label-width="80px"
                class="demo-ruleForm"
            >
                <el-form-item 
                    label="用户名" 
                    prop="username"
                >
                    <el-input v-model="userForm.username" />
                </el-form-item>

                <el-form-item 
                    label="密码" 
                    prop="password"
                >
                    <el-input v-model="userForm.password" type="password"/>
                </el-form-item>

                <el-form-item 
                    label="角色" 
                    prop="role"
                >
                    <el-select 
                        v-model="userForm.role" 
                        class="m-2" 
                        placeholder="请选择"
                        style="width:100%" 
                    >
                        <el-option
                            v-for="item in roleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item 
                    label="个人简介" 
                    prop="introduction"
                >
                    <el-input v-model="userForm.introduction" 
                        type="textarea"
                    />
                </el-form-item>
        </el-form>
            <template #footer>
            <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleEditConfirm()">
                确认
            </el-button>
            </span>
        </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref,onMounted,reactive } from 'vue'
import axios from 'axios'

//用户编辑模块
const dialogVisible = ref(false)
const userFormRef = ref()

//ref响应式数据格式
//let userForm = ref

let userForm = reactive({
    username:"",
    password:"",
    role:"", //1:管理员 2:编辑
    introduction:""
})
const userFormRules = reactive({
    username: [
    { required: true, message: '请输入账户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择该用户权限', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '填写你的个人介绍', trigger: 'blur' },
  ]
})
const roleOptions = [
    {
        label:"管理员",
        value:1
    },
    {
        label:"编辑",
        value:2
    }
]

//表单获取数据
const tableData = ref([])

onMounted(()=>{
    getTableData()
})

const getTableData = async ()=>{
    const res = await axios.get("/adminapi/user/list")
    // console.log(res.data)
    tableData.value = res.data.data
}

//编辑回调
const handleEdit = async(data) =>{
    // console.log(data)
    const res = await axios.get(`/adminapi/user/list/${data._id}`)
    console.log(res.data.data)

    //ref响应式数据 覆盖式提交
    //userForm.value = res.data.data[0]

    //reactive响应式数据 重新提交
    Object.assign(userForm,res.data.data[0])
    dialogVisible.value = true
}

//编辑确认回调
const handleEditConfirm = ()=>{
    userFormRef.value.validate( async(valid) =>{
        if(valid){
            //1. 更新后端
            // console.log(userForm)
            await axios.put(`/adminapi/user/list/${userForm._id}`,
            userForm)
            //2. dialog隐藏
            dialogVisible.value = false
            //3. 重新获取table数据
            getTableData()
        }
    })
}

//删除回调
const handleDelete = async (data)=>{
    console.log(data)
    await axios.delete(`/adminapi/user/list/${data._id}`)
    getTableData()
}
</script>

<style lang="scss" scoped>
.el-table{
    margin-top: 50px;
}
</style>