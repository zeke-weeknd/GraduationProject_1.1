module.exports = app => {
    const express = require('express')
    var qr = require('qr-image')//引入生成二维码的包
    const router  = express.Router()
    //获取教师的模型
    const Teacher = require('../../models/Teacher')
    const Class = require('../../models/Class')
    const Student = require('../../models/Student')
    var scanMessage = ""
    var scanStudentList = []
    




    //登陆路由
    router.post('/login',async(request,response) => {
        // console.log(request.body)
        const {userName,password} = request.body
        //根据用户名找用户
        // console.log(userName)
        const user = await Teacher.findOne({name:userName})
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
    //注册路由,其实就是新增了一个教师的记录
    router.post('/register',async(request,response) => {
        const model = await Teacher.create(request.body)
        response.send(model)
    })



    //教师新建课程
    router.post('/class',async(request,response) => {
        const model = await Class.create(request.body)
        response.send(model)
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
    //获取学生列表的接口
    router.get('/students',async(request,response) => {
        const items = await Student.find()
        response.send(items)
    })
    //获取课程详情的接口
    router.get('/class/:id', async(request,response) => {
        const model = await Class.findById(request.params.id)
        response.send(model)
    })
    //获取课程列表的接口
    router.get('/classlist/:id',async(request,response) => {
        const id = request.params.id
        const items = await Class.find({teacher:id}).populate('teacher')
        response.send(items)
    })
    //修改课程接口
    router.put('/class/:id', async(request,response) => {
        const model = await Class.findByIdAndUpdate(request.params.id,request.body)
        response.send(model)
    })
    //删除课程接口
    router.delete('/class/:id',async(request,response) => {
        await Class.findByIdAndDelete(request.params.id,request.body)
        response.send({
            success: true
        })
    })


    //生成二维码的路由
    router.get('/create_qrcode/:text',async (req, res) => {
        var text = req.params.text
        scanMessage = text//将二维码的信息存储在全局的scanmessage上
        // console.log(scanMessage)
        // console.log(text)
        try {
          var img = qr.image(text,{size :10});
          res.writeHead(200, {'Content-Type': 'image/png'});
          img.pipe(res);
        } catch (e) {
          res.writeHead(414, {'Content-Type': 'text/html'});
          res.end('<h1>414 Request-URI Too Large</h1>');
        }
      })
    //修改课程状态为正在上课
    router.get('/classStatesChance/:id',async(request,response) => {
        const model = await Class.findById(request.params.id)
        // console.log(model)
        model.state = 1
        await Class.findByIdAndUpdate(request.params.id,model)
        response.send({
            model:model
        })
    })
    //修改课程状态为正在下课
    router.get('/classStatesChance2/:id',async(request,response) => {
        const model = await Class.findById(request.params.id)
        // console.log(model)
        model.state = 0
        await Class.findByIdAndUpdate(request.params.id,model)
        response.send({
            model:model
        })
    })
    //获取二维码信息接口
    router.get('/scanMessage',async(request,response) => {
        // console.log(scanMessage)
        response.send({
            message:scanMessage
        })
    })
    //学生扫码后将个人信息和二维码信息发送到后台,完成签到的操作
    router.post('/studentScanMessage',async(request,response) => {
        // console.log(request.body)
        const studentId = request.body.student._id
        const classId = request.body.classId
        // console.log(classId)
        // console.log(request.body.QRMessage)
        const model = await Class.findById(classId)
        if(request.body.QRMessage === scanMessage && model.state === 1){
            //当学生扫码得到的二维码信息和后台的二维码信息一样的时候，将学生的isScande状态改为1表示已经扫码
            // request.body.student.isScande = 1
            // await Student.findByIdAndUpdate(studentId,request.body.student)
            scanStudentList.push(request.body.student)
            // console.log(scanStudentList)
            response.status(200).send({
                studentList:scanStudentList
            })
        }else{//当学生扫码得到的二维码信息和后台的二维码信息不一样的时候
            response.status(422).send({
                message:"二维码已过期"
            })
        }
    })
    //获取当前签到表信息
    router.get('/studentScanMessage',async(request,response) => {
        response.status(200).send({
            studentList:scanStudentList
        })
    })
    //网页的前端页面每隔一段时间都会向后台请求签到列表
    router.get('/studentList',async(request,response) => {
        response.send({
            studentList:scanStudentList
        })
    })
    //清楚签到表的信息
    router.get('/clear',async(request,response) => {
        scanStudentList = []
        response.send('清除成功')
    })



    app.use('/web/api',router)
}