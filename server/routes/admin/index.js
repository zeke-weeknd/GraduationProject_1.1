module.exports = app =>{
    const express = require('express')
    const router = express.Router()
    const Student = require('../../models/Student')








    //获取学生列表
    router.get('/students', async(request,response) => {
        const items = await Student.find()
        response.send(items)
    })
    //获取学生详情的接口
    router.get('/students/:id', async(request,response) => {
        const model = await Student.findById(request.params.id)
        response.send(model)
    })
    //创建学生的接口
    router.post('/students', async(request,response) => {
        const model = await Student.create(request.body)
        response.send(model)
    })
    //修改学生的接口
    router.put('/students/:id', async(request,response) => {
        const model = await Student.findByIdAndUpdate(request.params.id,request.body)
        response.send(model)
    })














    app.use('/admin/api', router)
}