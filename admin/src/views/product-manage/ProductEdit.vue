<template>
    <div>
        <el-page-header content="编辑产品" @back="handleBack()" title="产品管理"/>
        <el-form
            ref="productFormRef"
            :model="productForm"
            :rules="productFormRules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <el-form-item 
                label="产品名称" 
                prop="title"
            >
                <el-input v-model="productForm.title" />
            </el-form-item>

            <el-form-item 
                label="产品简要描述" 
                prop="introduction"
            >
                <el-input v-model="productForm.introduction" 
                    type="textarea"
                />
            </el-form-item>

            <el-form-item 
                label="产品详细描述" 
                prop="detail"
            >
                <el-input v-model="productForm.detail" 
                    type="textarea"
                />
            </el-form-item>
            
            <el-form-item 
                label="产品图片" 
                prop="cover"
            >
                <Upload 
                    :avatar="productForm.cover" 
                    @uesrChange="handleChange"/>
            </el-form-item>

            <el-form-item>
                <el-button 
                    type="primary" 
                    @click="submitForm()"
                >更新产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue'
import Upload from '@/components/upload/Upload'
import upload from "@/util/upload"
import {useRouter, useRoute} from 'vue-router';
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const productFormRef = ref()
const productForm = reactive({
    title:"",
    introduction:"",
    detail:"",
    cover:"",
    file:null
})

const productFormRules = reactive({
    title: [
    { required: true, message: '产品标题', trigger: 'blur' },
  ],
    introduction: [
    { required: true, message: '填写简要描述', trigger: 'blur' },
  ],
    detail: [
    { required: true, message: '填写详细描述', trigger: 'blur' },
  ],
    cover: [
    { required: true, message: '上传产品封面', trigger: 'blur' },
  ]
})

//选择图片后的回调函数
const  handleChange = file => {
    productForm.cover = URL.createObjectURL(file);
    productForm.file = file;
};

const submitForm = ()=>{
    productFormRef.value.validate(async (valid)=>{
        if(valid){
            // console.log(productForm)
            // 提交数据到后端
            await upload("/adminapi/product/list",productForm)

            router.push(`/product-manage/productlist`)
        }
    })
}

//页面回滚
const handleBack = () => {
    router.back()
}

onMounted(() => {
    getData()
})

const getData = async() => {
    const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
    console.log(res.data.data[0])

    Object.assign(productForm,res.data.data[0])
}
</script>

<style lang="scss" scoped>
.demo-ruleForm{
    margin-top: 50px;
}
</style>