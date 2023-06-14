<template>
    <div>
        <el-page-header content="个人中心" icon="" title="企业门户网站管理系统"/>
        <el-row :gutter="20" class="el-row">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar 
                        :size="100" 
                        :src="avatarUrl" 
                    />
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h5>{{ store.state.userInfo.role===1?'管理员':'编辑' }}</h5>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>

                        </div>
                    </template>
                    <!-- ref:协助校验表单 model:手机表单信息 rules:校验规则 -->
                    <el-form
                        ref="userFormRef"
                        :model="userForm"
                        :rules="userFormRules"
                        label-width="120px"
                        class="demo-ruleForm"
                    >
                        <el-form-item 
                            label="用户名" 
                            prop="username"
                        >
                            <el-input v-model="userForm.username" />
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
                                    v-for="item in options"
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
                            <Upload :avatar="userForm.avatar" 
                            @uesrChange="handleChange"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button 
                                type="primary" 
                                @click="submitForm()"
                            >更新</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { useStore } from "vuex"
import { computed,ref,reactive } from "vue"
import axios from 'axios'
import { ElMessage } from "element-plus"
import upload from "@/util/upload"
import Upload from '@/components/upload/Upload'

const store = useStore()

//用户头像
const avatarUrl = computed(
    () => 
    store.state.userInfo.avatar
        ? 'http://localhost:3000'+store.state.userInfo.avatar
        : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png` 
);

//表单获取当前用户基本信息
const { username,password,gender,introduction,avatar } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file:null
})
//表单校验规则
const userFormRules = reactive({
    username: [
    { required: true, message: '请输入账户名', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '填写你的个人介绍', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '上传头像', trigger: 'blur' },
  ]
})

//遍历性别下拉列表选项
const options = [
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

//选择图片后的回调函数
const  handleChange = file => {
    userForm.avatar = URL.createObjectURL(file);
    userForm.file = file;
};

//表单提交
const submitForm= ()=> {
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            // console.log("submit",userForm)
            const res = await upload("/adminapi/user/upload", userForm);
            if(res.ActionType==="OK"){
                store.commit("changeUserInfo",res.data)
                ElMessage.success("更新成功")    
            }
        }
    });
};
</script>

<style scoped lang="scss">
.el-row{
    margin-top: 20px;
    .box-card{
        text-align: center;
    }
}

</style>