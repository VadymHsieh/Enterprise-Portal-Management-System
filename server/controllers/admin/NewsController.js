const NewsService = require("../../services/admin/NewsService");

const NewsController = {
    add:async (req,res) => {
        //调用 service 进行添加
        // console.log(req.file,req.body)
        const cover = req.file?`/newsuploads/${req.file.filename}`:""
        const { title,content,category,editor,isPublish } = req.body
        await NewsService.add({
            title,
            content,
            category:Number(category),
            cover,
            isPublish:Number(isPublish),
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },
    updateList: async (req,res) => {
        const cover = req.file?`/newsuploads/${req.file.filename}`:""
        const { title,content,category,isPublish,_id } = req.body
        await NewsService.updateList({
            _id,
            title,
            content,
            category:Number(category),
            cover,
            isPublish:Number(isPublish),
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },
    getList: async (req,res) => {
        const result =await NewsService.getList({_id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
    },
    delList: async (req,res) => {
        await NewsService.delList({
            _id:req.params.id
        })
        res.send({
            ActionType:"OK"
        })
    },
    publish: async (req,res) => {
        await NewsService.publish({
            ...req.body,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },
    
}

module.exports = NewsController;