<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="登陆账号">
          <el-input v-model="model.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      model:{}
    }
  },
  methods:{
    async login(){
      const res = await this.$http.post('login',this.model)
      console.log(res.data.user)
      localStorage.userName = res.data.user.userName
      localStorage._id = res.data.user._id
      
      this.$router.push('/')
      this.$message({
        type:'success',
        message:"登陆成功"
      })
    }
  }
}
</script>
<style>
  .login-card{
    width: 30rem;
    margin: 10rem auto;
  }
</style>