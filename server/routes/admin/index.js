module.exports = app =>{
    const express = require('express')
    const router = express.Router()
    //获取学生的模型
    const Student = require('../../models/Student')
    //获取课程模型
    const Class = require('../../models/Class')
    //获取教师模型
    const Teacher = require('../../models/Teacher')
    //获取管理员模型
    const Admin = require('../../models/Administrators')








    //获取学生列表
    router.get('/students', async(request,response) => {
        const items = await Student.find().populate('Class')
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
    //删除学生的接口
    router.delete('/students/:id', async(request,response) => {
        await Student.findByIdAndDelete(request.params.id, request.body)
        response.send({
            success: true
        })
    })




    //创建课程的接口
    router.post('/class', async(request,response) => {
        const model = await Class.create(request.body)
        response.send(model)
    })
    //获取课程列表
    router.get('/class', async(request,response) => {
        const items = await Class.find().populate('Student')
        response.send(items)
    })
    //获取课程详情的接口
    router.get('/class/:id', async(request,response) => {
        const model = await Class.findById(request.params.id)
        response.send(model)
    })
    //修改课程的接口
    router.put('/class/:id', async(request,response) => {
        const model = await Class.findByIdAndUpdate(request.params.id,request.body)
        response.send(model)
    })
    //删除课程的接口
    router.delete('/class/:id', async(request,response) => {
        await Class.findByIdAndDelete(request.params.id, request.body)
        response.send({
            success: true
        })
    })
    //修改学生所属课程的接口
    router.post('/class/changeClass/:id',async(request,response) => {
        //修改学生的class


        //这里我的逻辑是，先查找出所有学生的列表，然后循环遍历，判断学生的id是否在传过来的学生列表中
        //如果在，判断这个学生的class中有没有传过来的classId，如果有，不操作，如果没有，增加
        //如果不在，判断这个学生的class中有没有传过来的classId，如果有，删除，如果没有，不操作


        let classId = request.params.id//传递过来的课程id
        let students = request.body.students//传递过来的学生列表
        //先查找出所有的学生列表
        const items = await Student.find()
        //const ID = [];
        // for(i=0;i<items.length;i++){
        //     ID.push(items[i]._id.toString())
        // }
        //console.log(ID)//完整的学生id列表
        //console.log(students)//传过来的学生id列表
        // console.log(classId)

        for(i=0;i<items.length;i++){
            if( students.indexOf(items[i]._id.toString()) != -1 ){//判断学生的id是否在传过来的学生列表中
                //在，判断这个学生的class中有没有传过来的classId，如果有，不操作，如果没有，增加
                // console.log(items[i].class)
                if(items[i].class.indexOf(classId) === -1){
                    items[i].class.push(classId)
                    // console.log("已经push进去了")
                    await Student.findByIdAndUpdate(items[i]._id,items[i])
                }else{
                    // console.log("已经存在了")
                }
                
            }else{//如果不在，判断这个学生的class中有没有传过来的classId，如果有，删除，如果没有，不操作
                if(items[i].class.indexOf(classId) != -1){
                    items[i].class.remove(classId)
                    // console.log("已经删除")
                    await Student.findByIdAndUpdate(items[i]._id,items[i])
                }else{
                    // console.log("还没有，不操作")
                }
                // console.log("不存在")
            }
        }
        // console.log(items)

        response.send({
            success: true
        })
        //将处理完的学生的数据更新
        // await Student.update(items)
        // const items2 = await Student.find()
        // console.log(items2)

    })



    
    //获取教师列表
    router.get('/teachers', async(request,response) => {
        const items = await Teacher.find()
        response.send(items)
    })
    //创建教师的接口
    router.post('/teachers', async(request,response) => {
        const model = await Teacher.create(request.body)
        response.send(model)
    })
    //修改教师的接口
    router.put('/teachers/:id', async(request,response) => {
        const model = await Teacher.findByIdAndUpdate(request.params.id,request.body)
        response.send(model)
    })
    //获取教师详情的接口
    router.get('/teachers/:id', async(request,response) => {
        const model = await Teacher.findById(request.params.id)
        response.send(model)
    })
    //删除教师的接口
    router.delete('/teachers/:id', async(request,response) => {
        await Teacher.findByIdAndDelete(request.params.id, request.body)
        response.send({
            success: true
        })
    })



    //获取管理员列表
    router.get('/admins', async(request,response) => {
        const items = await Admin.find()
        response.send(items)
    })
    //创建管理员的接口
    router.post('/admins', async(request,response) => {
        const model = await Admin.create(request.body)
        response.send(model)
    })
    //修改管理员的接口
    router.put('/admins/:id', async(request,response) => {
        const model = await Admin.findByIdAndUpdate(request.params.id,request.body)
        response.send(model)
    })
    //获取管理员详情的接口
    router.get('/admins/:id', async(request,response) => {
        const model = await Admin.findById(request.params.id)
        response.send(model)
    })
    //删除管理员的接口
    router.delete('/admins/:id', async(request,response) => {
        await Admin.findByIdAndDelete(request.params.id, request.body)
        response.send({
            success: true
        })
    })

    //登陆路由
    router.post('/login',async(request,response) => {
        // response.send('ok')
        const {userName,password} = request.body
        //根据用户名找用户
        // console.log(userName)
        const user = await Admin.findOne({userName:userName})
        if(!user){
            return response.status(422).send({
                message:'用户不存在'
            })
        }
        //验证密码

        if(user.password!=password){
            return response.status(422).send({
                message:'密码不正确'
            })
        }else{
            response.send({user})
        }
        // console.log(user.password)
        
        
    })




    app.use('/admin/api', router)
}