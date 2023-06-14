const UserModel = require("../../models/UserModel")

const UserService = {
    login:async ({username,password}) =>{
        return UserModel.find({
            username,
            password
        })
    },

    //通过if判断是否修改avatar，从而选择局部更新或全局更新
    upload:async ({_id,username,password,introduction,gender,avatar}) => {
        if(avatar){
            return UserModel.updateOne({
                _id
            },{
                username,password,introduction,gender,avatar
            })
        }else{
            return UserModel.updateOne({
                _id
            },{
                username,password,introduction,gender
            })
        }
    },

    add:async ({username,password,introduction,gender,avatar,role}) => {
        return UserModel.create({
            username,password,introduction,gender,avatar,role
        })
    },

    getList:async ({id})=> {
        return id?UserModel.find({_id:id},["username","introduction","gender","password","role"]):
        UserModel.find({},["username","introduction","gender","avatar","role"])
    },

    putList:async (body)=> {
        return UserModel.updateOne({_id:body._id},body)
    },

    delList:async (_id)=> {
        return UserModel.deleteOne({_id})
    }
}

module.exports = UserService