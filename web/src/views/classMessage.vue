<template>
    <div class="main">
      <!-- 顶部导航 -->
      <div class="topNav">
        <div class="topNav-contain">
            <img src="../images/Sign.png" alt="" @click="goToIndex">
            <div class="loginAndRegister">
                <router-link class="login" to="/login-1">{{username? '欢迎你，'+username:'登录'}}</router-link>
                <router-link class="register" to="">注册</router-link>
            </div>
            
        </div>
      </div>
      <div class="contain">
        <div class="left">
          <!-- 基本信息盒子 -->
          <div class="message">
            <h3>当前课程：</h3>
            <h1>{{this.model.name}}</h1>
            <span>{{this.model.description}}</span>
          </div>
          <!-- 功能按钮盒子 -->
          <div class="function">
            <button @click.prevent="startClass" :disabled="flag">{{this.start}}</button>
            <button>随机抽查</button>
            <button @click.prevent="endClass" :disabled="flag3">下课</button>
            <button @click.prevent="export2Excel" :disabled="flag2">导出名单</button>
          </div>
        </div>
        <div class="right">
          <div class="scanImg" >
            <!-- <img src="" alt="" > -->
            <!-- <div class="white" v-show="show"></div> -->
            <img :src="imgURL" v-show="show" crossOrigin  />
          </div>
        </div>
      </div>
      <!-- 底部显示学生 -->
      <div class="student">
        <h3>已签到学生：</h3>
        <div class="list">
          <div v-for="(item,i) in studentList" v-bind:key="i">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props:{
    id:{}
  },
  data(){
    return{
      model:{},
      username:sessionStorage.name,
      studentList:[
        // {class: Array(2),
        // _id: "5e9aa5b35e9e2941f4359104",
        // name: "王齐乐",
        // sno: "3116004285",
        // sex: "男",
        // isScande: 1,
        // isBind: 1,
        // password: "123",
        // email: "1059718708",
        // phone: "13143548467",}
      ],
      imgMessage:'123',
      imgURL:"http://localhost:3000/web/api/create_qrcode/123",
      show:false,
      flag:false,
      flag2:true,
      flag3:true,
      start:"开始上课",
      time:null,
      QRtime:null
    }
  },
  methods:{
    async getClassMessage(){
      const res = await this.$http.get(`class/${this.id}`)
      this.model = res.data
      // console.log(this.model)
    },
    goToIndex(){
      this.$router.push('/')
    },
    async getImg(){
      await this.$http.get(`create_qrcode/${this.imgMessage}`)
      // console.log(img)
    },
    randomNum(){
      this.imgMessage = Math.random().toString(36).slice(-8)
      console.log(this.imgMessage)
      this.imgURL = "http://localhost:3000/web/api/create_qrcode/"+this.imgMessage
    },
    //开始上课
    async startClass(){
      //设置开始上课按钮不可点击,设置文字为正在上课
      this.flag = !this.flag
      this.start = "正在上课"
      //设置下课按钮可用
      this.flag3 = !this.flag3
      //1.生成一个随机的字符串,并将这个字符串设置到imgMessage中，将二维码的src属性最后携带的信息替换成imgMessage
      this.randomNum()
      //每隔一段时间调用这个方法，使其更换二维码
      this.QRtime = setInterval(() => {
        setTimeout(()=>{
          this.randomNum()
        }, 0)
      }, 100000)
      //2、打开二维码（原本应该是不存在二维码的，点击之后才会生成二维码）
      this.show = !this.show
      //3、将当前的课程的正在上课属性修改成正在上课（0修改成1）
      await this.$http.get(`classStatesChance/${this.id}`)
      //每隔一段时间自动获取最新的签到名单
      this.time = setInterval(() => {
        setTimeout(()=>{
          this.getStudentList()
        }, 0)
      }, 5000)
    },
    //获取列表的方法
    async getStudentList(){
        const studentList = await this.$http.get('studentList')
        // console.log(studentList.data.studentList)
        this.studentList = studentList.data.studentList
    },
    //下课
    async endClass(){
      //清除定时器，让它不再向后台发送请求
      clearInterval(this.time)
      //清楚更换二维码的定时器
      clearInterval(this.QRtime)
      //关闭二维码
      this.show = !this.show 
      //设置正在上课按钮可用
      this.start = "开始上课"
      this.flag = !this.flag
      //设置自己不可用
      this.flag3 = !this.flag3
      //设置导出名单按钮可用
      this.flag2 = !this.flag2
      //将该课程的状态修改为0
      await this.$http.get(`classStatesChance2/${this.id}`)

    },
    //导出名单
    formatJson(filterVal, jsonData) {
    　return jsonData.map(v => filterVal.map(j => v[j]))
    },
    export2Excel() {
    　require.ensure([], () => {
    　　　const { export_json_to_excel } = require('../vendor/Export2Excel');
    　　　const tHeader = ['学生姓名','学生学号','性别','邮箱','手机号码'];
    　　　const filterVal = ['name', 'sno', 'sex', 'email', 'phone'];
    　　　const list = this.studentList;
    　　　const data = this.formatJson(filterVal, list);
    　　　export_json_to_excel(tHeader, data, '签到表');
    　})
    //清楚签到表
    this.$http.get('clear')
    this.$router.go(-2)
    },
  },
  created() {
    // this.getImg()
    this.getClassMessage()
  },
  destroyed () {//清除定时器
    clearInterval(this.time)
},
}
</script>
<style lang="scss">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
  .main{
    width: 100%;
    // height: 100%;
    .topNav{
      width: 100%;
      height: 60px;
      // background-color: rgb(255, 235, 235);
      .topNav-contain{
        width: 85%;
        height: 100%;
        // background-color: rgb(255, 166, 166);
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        img{
          height: 35%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        .loginAndRegister{
          width: 200px;
          height: 100%;
          background-color: #fff;
          float: right;
          
          .login,.register{
              text-decoration: none;
              color: black;
              position: absolute;
              top: 50%;
              right: 10%;
              transform: translateY(-50%);
          }
          .register{
            right: 2%;
          }
        }
      }
    }
    .contain{
      width: 85%;
      height: 400px;
      // background-color: rgb(161, 161, 161);
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      .left{
        width: 700px;
        height: 100%;
        // background-color: rgb(233, 233, 233);
        .message{
          position: relative;
          width: 100%;
          height: 70%;
          // background-color: rgb(151, 151, 151);
          h3,h1,span{
            display: inline-block;
            position: absolute;
            left: 40px;
            top: 20px;
          }
          h3{
            font-size: 20px;
            font-weight:lighter;
          }
          h1{
            font-size: 70px;
            top: 40px;
          }
          span{
            font-size: 20px;
            top: 150px;
            width: 90%;
            height: 40%;
            background-color: #fff;
          }
        }
        .function{
          width: 100%;
          height: 30%;
          // background-color: #fff;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        button{
          display: inline-block;
          // position: relative;
          // top: 50%;
          // transform: translateY(-50%);
          width: 100px;
          height: 50px;
          border-radius: 15px;
          border: none;
          font-size: 16px;
        }
        button:nth-child(1){
          background-color: #5f52a0;
          color:#fff;
        }
        button:nth-child(2){
          background-color: #5f52a0;
          color:#fff;
        }
        button:nth-child(3){
          background-color: #FE3A61;
          color:#fff;
        }
        button:nth-child(4){
          border: 1px solid #5f52a0;
          background-color: #fff;
          color:#5f52a0;
        }
      }
      .right{
        position: absolute;
        right: 0;
        top: 0;
        width: 600px;
        height: 100%;
        // background-color: rgb(255, 241, 241);
        .scanImg{
          width: 350px;
          height: 350px;
          // background-color: rgb(117, 117, 117);
          position: absolute;
          top: 50%;
          left: 18%;
          transform: translateY(-50%);
          .white{
            width: 350px;
            height: 350px;
            background:#fff;
            position: absolute;
          }
          img{
            display: inline-block;
            width: 350px;
            height: 350px;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
          }
        }
      }
    }
    .student{
      width: 85%;
      height: 400px;
      // background: rgb(230, 255, 201);
      position: relative;
      margin-top: 10px;
      left: 50%;
      transform: translateX(-50%);
      padding-top: 10px;
      // padding-left: 40px;
      h3{
        font-size: 20px;
        margin-left: 20px;
      }
      .list{
        width: 100%;
        height: 90%;
        background-color: #fff;
        overflow: auto;
        padding-left: 10px;
        div{
          width: 80px;
          height: 80px;
          // background-color: rgb(254, 255, 217);
          display: inline-block;
          margin: 15px;
          box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
          border-radius: 5px;
          text-align: center;
          line-height: 80px;
        }
        
      }
    }
  }
</style>