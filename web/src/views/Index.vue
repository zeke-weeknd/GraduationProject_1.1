<template>

  <div class="main">
    <!-- 顶部导航 -->
    <div class="topNav">
      <div class="topNav-contain">
        <img src="../images/Sign.png" alt="">
        <div class="loginAndRegister">
          <router-link class="login" to="/login">登录</router-link>
          <router-link class="register" to="">注册</router-link>
        </div>
        </div>
    </div>
    <!-- logo区域 -->
    <div class="logo">
      <div class="logo_main">
        <span>S</span>
        <span>i</span>
        <span>g</span>
        <span>n</span>
      </div>
      <span>让签到变得更加智能</span>

      <!-- 功能区域 -->
      <div class="function">
        <div class="newClass">
          <img src="../images/图层 2.png" alt="" width="100%" height="100%">
          <div>
            <h2>.新建课程</h2>
            <span>New curriculum</span>
          </div>
        </div>
        <div class="Class">
          <img src="../images/图层 3.png" alt="" width="100%" height="100%">
          <div>
             <h2>.课程管理</h2>
             <span>Management course</span>
          </div>
        </div>
        <div class="startClass">
          <img src="../images/图层 4.png" alt="" width="100%" height="100%">
          <div>
             <h2>.开始上课</h2>
             <span>Class begins</span>
          </div>
        </div>
        <div class="moreFunction">
          <img src="../images/图层 5.png" alt="" width="100%" height="100%">
          <div>
             <h2>.更多功能</h2>
             <span>敬请期待</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部区域 -->
    <div class="bottom">
      <img src="../images/图层 6.png" alt="">
    </div>
  </div>
</template>

<script>


export default {
  
}
</script>
<style lang="scss">
  .main{
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
    .logo{
      width: 85%;
      height: 300px;
      // background-color: rgb(255, 193, 193);
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      .logo_main{
        width: 200px;
        height: 200px;
        // background-color: #fff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        span{
          font-size: 60px;
          font-weight: bold;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        span:nth-child(2){
          color: #5f52a0;
          left: 40px;
        }
        span:nth-child(3){
          left: 65px;
        }
        span:nth-child(4){
          left: 110px;
        }
      }
      span{
        position: absolute;
        bottom: 20%;
        font-size: 20px;
        letter-spacing:8px;
      }
      .function{
        width: 75%;
        height: 180%;
        // background-color: rgb(126, 126, 126);
        position: absolute;
        z-index: 1;
        top: 50%;
        right: 0;
        display: flex;
        justify-content: space-between;
        div{
          width: 22%;
          height: 100%;
          background-color: #fff;
          position: relative;
          div{
            width: 100%;
            height: 35%;
            background-color: rgb(255, 255, 255);
            position: absolute;
            bottom: 0;
            h2,span{
              margin-left: 20px;
            }
            span{
              font-size: 15px;
            }
          }
        }
      }
    }

    .bottom{
      width: 100%;
      height: 500px;
      background-color: rgb(255, 205, 205);
      position: absolute;
      bottom: 0;
      z-index: -1;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
