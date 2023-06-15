<template>
    <div>
        <el-page-header content="添加用户" icon="" title="用户管理"/>
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
                label="性别" 
                prop="gender"
            >
                <el-select 
                    v-model="userForm.gender" 
                    class="m-2" 
                    placeholder="请选择"
                    style="width:100%" 
                >
                    <el-option
                        v-for="item in genderOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
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
            
            <el-form-item 
                label="上传头像" 
                prop="avatar"
            >
                <Upload 
                    :avatar="userForm.avatar" 
                    @uesrChange="handleChange"/>
            </el-form-item>

            <el-form-item>
                <el-button 
                    type="primary" 
                    @click="submitForm()"
                >添加用户</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import Upload from '@/components/upload/Upload'
import upload from "@/util/upload"
import {useRouter, userRouter} from 'vue-router';


const userFormRef = ref()
const userForm = reactive({
    username:"",
    password:"",
    gender:"",
    role:"", //1:管理员 2:编辑
    introduction:"",
    avatar:"",
    file:null
})

const userFormRules = reactive({
    username: [
    { required: true, message: '请输入账户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择该用户权限', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '填写你的个人介绍', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '上传头像', trigger: 'blur' },
  ]
})

const genderOptions = [
    {
        label:"保密",
        value:0
    },
    {
        label:"男",
        value:1
    },
    {
        label:"女",
        value:2
    },
]

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

//选择图片后的回调函数
const  handleChange = file => {
    userForm.avatar = URL.createObjectURL(file);
    userForm.file = file;
};

const router = useRouter()

const submitForm = ()=>{
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            // 提交数据到后端
            await upload("/adminapi/user/add",userForm)

            router.push(`/user-manage/userlist`)
        }
    })
}

</script>

<style lang="scss" scoped>
.demo-ruleForm{
    margin-top: 50px;
}
</style>