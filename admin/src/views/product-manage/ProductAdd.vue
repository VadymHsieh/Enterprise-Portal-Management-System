<template>
    <div>
        <el-page-header content="添加产品" icon="" title="产品管理"/>
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
                >添加产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import Upload from '@/components/upload/Upload'
import upload from "@/util/upload"
import {useRouter, userRouter} from 'vue-router';


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

const router = useRouter()

const submitForm = ()=>{
    productFormRef.value.validate(async (valid)=>{
        if(valid){
            // console.log(productForm)
            // 提交数据到后端
            await upload("/adminapi/product/add",productForm)

            router.push(`/product-manage/productlist`)
        }
    })
}

</script>

<style lang="scss" scoped>
.demo-ruleForm{
    margin-top: 50px;
}
</style>