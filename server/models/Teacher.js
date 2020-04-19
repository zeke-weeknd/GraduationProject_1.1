const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type:String },
    tno: { type: String },//教师编号
    sex: {type: String},
    password: {type: String},
    class: [
        { type:mongoose.SchemaTypes.ObjectId,ref:'Class' }//与class模型形成关联
    ]
})

module.exports = mongoose.model('Teacher',schema)