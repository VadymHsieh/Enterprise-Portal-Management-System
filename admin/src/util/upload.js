import axios from 'axios'

//uplaod 表单提交封装
function upload(path,userForm){
    const params = new FormData()
    for(let i in userForm){
        params.append(i,userForm[i])
    }
    // console.log(params)
    return axios.post(path,params,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }).then(res=>res.data)
}

export default upload