const jsonwebtoken = require("jsonwebtoken")
const secret = "rhee"
//生成json签名方法
const JWT = {
    generate(value,expires){
        //value：加密内容，secret：密钥，expiresIn：过期时间
        return jsonwebtoken.sign(value,secret,{expiresIn:expires})
    },
    //解密，验证token是否过期
    verify(token){
        try{
            return jsonwebtoken.verify(token,secret)
        }catch(e){
            return false
        }
    }
}
const token = JWT.generate({name:"rhee"},"10s")
console.log(JWT.verify(token))

setTimeout(()=>{
    console.log(JWT.verify(token))
},11000)

module.exports = JWT