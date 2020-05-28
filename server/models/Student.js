const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type:String },
    sno: { type: String },//学号
    sex: {type: String},
    isScande: { type: Number },//是否扫码，0是未扫码，1是已扫码
    isBind: { type:Number },//是否绑定，0是未绑定，1是已绑定
    password: {type: String},
    phone:{type: String},
    email:{type:String},
    class: [
        { type:mongoose.SchemaTypes.ObjectId,ref:'Class' }//与class模型形成关联
    ]
})

module.exports = mongoose.model('Student',schema)