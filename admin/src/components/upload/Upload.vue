<template>
    <!-- 
        class:upload组件样式 
        action:提交后端 
        show-file-list:上传成功后，是否展示列表 
        auto-upload:是否自动上传
    -->
    <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="handleChange"
    >
    <!-- 
        v-if：如果userForm含用户自上传头像，则显示用户自上传头像
        v-else：如果用户未上传头像，则显示组件默认图标
    -->
        <img 
            v-if="props.avatar" 
            :src="uploadAvatar" 
            class="avatar" 
        />
        <el-icon 
            v-else 
            class="avatar-uploader-icon"
        >
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { defineEmits,defineProps,computed } from 'vue';

//选择图片后的回调函数  父子通信
const props = defineProps({
    avatar:String
})

//子传父
const emit = defineEmits("uesrChange")

const uploadAvatar = computed(()=>
    props.avatar.includes("blob")?props.avatar:'http://localhost:3000'+props.avatar
)

//父子件接收
const  handleChange = file => {
    emit("uesrChange",file.raw)

};

</script>

<style lang="scss" scoped>
//头像框组件样式
::v-deep .el-upload {
    //深度选择为内部组件添加样式
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar{
    width: 178px;
    height: 178px;
}
</style>