<template>
    <div class="form-box">
        <h2>请<span style="color:#5f52a0;">注册</span>
               
        </h2>
        <form @submit.prevent="register">
            <input type="text" v-model="model.name" placeholder="请输入账号名">
            <input type="text" v-model="model.password" placeholder="请输入密码">
            <input name="sex" type="radio" value="男"  class="man" v-model="model.sex"/><span id="man">男</span>
            <input name="sex" type="radio" value="女" class="woman" v-model="model.sex"/><span id="woman">女</span>
            <button type="reset" class="reset" style="left:18%; color:#5f52a0; 
                                        background-color:#fff; 
                                         box-shadow: 2px 2px 10px rgba(0,0,0,0.2);">重置</button>
            <button type="submit" class="register">注册</button>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            model:{}
        }
    },
    methods: {
        async save(){
            console.log(this.model)
            const res = await this.$http.post('login',this.model)
            console.log(res.data)
            sessionStorage.id = res.data._id//存储教师的id
            sessionStorage.name = res.data//教师姓名
            sessionStorage.tno = res.data.tno//教师编号
            sessionStorage.sex = res.data.sex//教师性别
            //跳转到首页
            this.$router.push('/')
            this.$message({
              type:'success',
              message:"登陆成功"
            })
        }
    },
}
</script>
<style lang="scss">
// *{
//     box-sizing: border-box;
// }
// .main{
//     width: 100%;
    
//     // height: 100%;
//     .topNav{
//       width: 100%;
//       height: 60px;
//       .topNav-contain{
//         width: 85%;
//         height: 100%;
//         // background-color: rgb(255, 166, 166);
//         position: relative;
//         left: 50%;
//         transform: translateX(-50%);
//         img{
//           height: 35%;
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//         }
//         .loginAndRegister{
//           width: 200px;
//           height: 100%;
//           background-color: #fff;
//           float: right;
          
        
//         }
//       }
//     }
//     .middle{
//         width: 85%;
//         height: 800px;
//         // background-color: rgb(255, 225, 225);
//         position: relative;
//         left: 50%;
//         transform: translateX(-50%);
//         .logo{
//             width: 500px;
//             height: 500px;
//             background-color: #fff;
//             position: absolute;
//             top: 40%;
//             left: 10%;
//             transform: translateY(-50%);
//             img,h2{
//                 position:absolute;
//                 top: 50%;
//                 left: 50%;
//                 transform: translate(-50%,-50%);
//                 font-size: 80px;
//                 color: #fff;
//             }
//             .sign{
//                 top: 35%;
//             }
//             .login-register{
//                 position:absolute;
//                 top: 70%;
//                 left: 50%;
//                 transform: translate(-50%,-50%);
//                 font-size: 20px;
//                 a{
//                     color: #fff;
//                     text-decoration: none;
//                     margin-left: 5px;
//                     margin-right: 5px;
//                 }
//                 .active{
//                     font-size: 25px;
//                     font-weight: bold;
//                 }
//             }
//         }
//         .form{
//             width: 600px;
//             height: 500px;
//             background-color: #fff;
//             position: absolute;
//             top: 40%;
//             right: 10%;
//             transform: translateY(-50%);
//             .form-box{
//                 width: 100%;
//                 height: 70%;
//                 // background-color: rgb(255, 208, 208);
//                 position: absolute;
//                 top: 50%;
//                 transform: translateY(-50%);
//                 h2{
//                     position: absolute;
//                     left: 5%;top: 5%;
//                     font-size: 30px;
//                 }
//                 input{
//                     position: absolute;
//                     left: 5%;
//                     top: 35%;
//                     display: inline-block;
//                     width: 350px;
//                     height: 40px;
//                     border: none;
//                     border-radius: 20px;
//                     box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
//                     padding-left: 20px;
//                 }
//                 input:nth-child(2){
//                     top: 55%;
//                 }
//                 button{
//                     position: absolute;
//                     right: 50%;
//                     bottom: 10%;
//                     display: inline-block;
//                     width: 70px;
//                     height: 40px;
//                     border: none;
//                     border-radius: 20px;
//                     // box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
//                     background-color: #5f52a0;
//                     color: #fff;
//                 }
                
//             }
//         }
//     }
// }
</style>