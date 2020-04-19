const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userName: { type:String },//登陆账号
    password: {type: String},//登陆密码
    
})

module.exports = mongoose.model('Administrators',schema)