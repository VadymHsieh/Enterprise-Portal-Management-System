const mongoose  = require("mongoose")
const Schema = mongoose.Schema
// news模型===>news集合

const NewsType = {
    title:String,
    content:String,
    category:Number, //类别 1，2，3
    cover:String, //封面
    isPublish:Number, //发布状态：未发布 已发布
    editTime:Date //最近一次编辑时间
}
const NewsModel = mongoose.model("news",new Schema(NewsType))
//模型news 将会创建对应 news 集合
module.exports = NewsModel