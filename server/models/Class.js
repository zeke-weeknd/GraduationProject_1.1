const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    cno: { type:String },//课程编号
    name: { type:String },//课程名称
    description: { type:String },
    state: { type:Number },//课程状态，0表示下课状态，1表示上课状态
    teacher: { type:mongoose.SchemaTypes.ObjectId,ref:'Teacher' },
    students: [
        { type:mongoose.SchemaTypes.ObjectId,ref:'Student' }//与class模型形成关联
    ]
})

module.exports = mongoose.model('Class',schema)