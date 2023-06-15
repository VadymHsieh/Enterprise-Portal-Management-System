var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');
var NewsRouter = express.Router();

//图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })
//涉及文件上传，普通post无法获取上传文件，需要加上 multer 中间件
NewsRouter.post("/adminapi/news/add",upload.single("file"),NewsController.add)
NewsRouter.get("/adminapi/news/list",NewsController.getList)
NewsRouter.post("/adminapi/news/list",upload.single("file"),NewsController.updateList)
NewsRouter.get("/adminapi/news/list/:id",NewsController.getList)
NewsRouter.delete("/adminapi/news/list/:id",NewsController.delList)
NewsRouter.put("/adminapi/news/publish",NewsController.publish)

module.exports = NewsRouter