module.exports = app => {
    const express = require('express')
    var qr = require('qr-image')//引入生成二维码的包
    const router  = express.Router()
    //获取教师的模型
    const Teacher = require('../../models/Teacher')
    const Class = require('../../models/Class')
    const Student = require('../../models/Student')
    


    //注册接口
    router.post('/register',async(request,response) => {
        // const model = await Class.create(request.body)
        //获得收到的学生的学号，查询这个学生的注册信息是否已经被注册isBind，0是未绑定，1是已绑定
        //如果是0，将isBind修改成1，如果是1返回“已经注册的信息”
        console.log(request.body)
        const sno = request.body.data.sno
        const model = await Student.findOne({sno:sno})
        // console.log(model)
        if(!model){
            return response.status(404).send({
                message:'该用户不存在，请输入正确的学号进行注册'
            })
        }else{
            if(model.isBind===0){
                model.isBind = 1
                model.password = request.body.data.password
                model.phone = request.body.data.phone
                model.email = request.body.data.email
                response.status(200).send({
                    message:'注册成功'
                })
            }else{
                response.status(422).send({
                    message:'该用户已被注册'
                })
            }
        }
        console.log(model)
        await Student.findByIdAndUpdate(model._id,model)
    })
    //登录接口
    router.post('/login',async(request,response) => {
        // console.log(request.body)
        const sno = request.body.student.sno
        const password = request.body.student.password
        const model = await Student.findOne({sno:sno})
        if(!model){
            return response.status(404).send({
                message:'用户名错误'
            })
        }else{
            if(model.isBind === 0){
                response.status(422).send({
                    message:'该用户未注册'
                })
            }else if(model.isBind === 1){
                if(model.password === password){
                    response.status(200).send({
                        message:'登陆成功',
                        student: model
                    })
                }else{
                    response.status(400).send({
                        message:'登陆失败'
                    })
                }
                
            }
        }
    })
    //获取课程列表信息
    router.post('/classList',async(request,response) => {
        const model = await Student.findOne({sno:request.body.student.sno})
        const classIdList = model.class//课程id列表
        const classList = []//课程列表
        for(let i=0;i<classIdList.length;i++){ 
            classList.push(await Class.findById(classIdList[i]).populate('teacher'))
        }
        // console.log(classList)
        response.status(200).send({
            classList:classList
        })
    })
    //获取课程的信息
    router.post('/class',async(request,response) => {
        // console.log(request.body)
        const model = await Class.findById(request.body.classId).populate('teacher')
        response.status(200).send({
            classMessage:model
        })
    })








 

    app.use('/wx/api',router)
}