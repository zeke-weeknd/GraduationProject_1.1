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
            <button @click.prevent="startClass">开始上课</button>
            <button>随机抽查</button>
            <button>下课</button>
            <button>导出名单</button>
          </div>
        </div>
        <div class="right">
          <div class="scanImg">
            <!-- <img src="" alt="" > -->
            <img src="http://localhost:3000/web/api/create_qrcode/123" crossOrigin />
          </div>
        </div>
      </div>
      <!-- 底部显示学生 -->
      <div class="student">
        <h3>已签到学生：</h3>
        <div class="list">
          <div v-for="(item,i) in studentList" v-bind:key="i"></div>
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
        {name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},
        {name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},
        {name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},
        {name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},
        {name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},
        {name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},
        {name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'},{name: 'zima'}
      ],
      imgMessage:'123'
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


    //开始上课
    async startClass(){
      //开始上课逻辑代码
      //1、将当前的课程的正在上课属性修改成正在上课（0修改成1）
      //2、打开二维码（原本应该是不存在二维码的，点击之后才会生成二维码）
      //3、新建一个签到表数据，获取这个数据，将其渲染到页面中
        //3.1获取当前二维码所存储的信息，
        //3.2学生扫码后将扫到的信息发送给后台，验证这个信息是否匹配
        //3.3如果匹配，将学生的名单添加到签到表中，并将学生的是否签到属性修改为1（已签到）

        //这里要注意每隔一段时间自动获取最新的签到名单

    },






  },
  
  created() {
    // this.getImg()
    this.getClassMessage()
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
        }
        
      }
    }
  }
</style>