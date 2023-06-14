const mongoose  = require("mongoose")
const Schema = mongoose.Schema
// news模型===>news集合

const ProductType = {
    title:String,
    introduction:String,
    detail:String,
    cover:String, //封面
    editTime:Date
}
const ProductModel = mongoose.model("product",new Schema(ProductType))
//模型news 将会创建对应 news 集合
module.exports = ProductModel