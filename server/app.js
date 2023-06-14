var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const JWT = require('./util/JWT');
const NewsRouter = require('./routes/admin/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*
前后端分离接口
 /adminapi/* - 后台系统接口
 /webapi/* - 企业官网接口
*/

//  中间键
app.use((req,res,next)=>{
  //  token有效，授权通过，next()
  //  token过期，返回401错误
  //  避免login进入
  if(req.url==="/adminapi/user/login"){
    next()
    return;
  }
  //  切割Bearer，获取token
  //  以空格切割字符串，转换成数组获取第0个元素
  const token = req.headers["authorization"].split(" ")[1]
  if(token){
    var payload = JWT.verify(token)
    // console.log(payload)
    if(payload){
      //  值为真，重新生成token并重新计数有效期
       const newToken = JWT.generate({
        _id:payload._id,
        username:payload.username
       },"1d")
       res.header("Authorization",newToken)
      next()
    }else{
      //  值为假，返回401信息
      res.status(401).send({errCode:"-1",errorInfo:"toekn过期"})
    }
  }
})

app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
