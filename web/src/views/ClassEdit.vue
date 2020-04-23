<template>
    <el-container style="height: 100vh;">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu router :default-openeds="['1','2', '3','4']">
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>管理课程</template>
                <el-menu-item-group>
                  <template slot="title">课程</template>
                  <el-menu-item index="/newClass">新建课程</el-menu-item>
                  <el-menu-item index="/classList">课程列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <span>当前帐号：{{username}}</span>
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <router-link to="/login-1" class="loginLink">切换账号</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link to="/" class="loginLink">回到首页</router-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                
            </el-header>
            <el-main>
                <router-view></router-view>   
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    props:{
        id:{}
    },
    data(){
        return{
            model:{},
            studentList:[],
            username:sessionStorage.name
        }
    },
    methods: {
        async save(){
            if(this.id){
                await this.$http.put(`class/${this.id}`,this.model)  
            }else{
                await this.$http.post('class',this.model)
            }
            
            this.$router.push('/class/list')
            this.$message({
                type:'success',
                message:'保存成功'
            })
            //保存完一个课程后，将选中的学生的id拿出来，修改他们的class字段数据
            // console.log(this.model.students)
            await this.$http.post(`class/changeClass/${this.model._id}`,this.model)
        },
        async fetch(){
            const res = await this.$http.get(`class/${this.id}`)
            this.model = res.data
        },
        
        async fetchStudentList(){
            const res = await this.$http.get('students');
            this.studentList = res.data
            // console.log(this.studentList)
        }
    },
    created(){
        this.fetchStudentList()
        this.id && this.fetch()
        // console.log(this.id)
    }
}
</script>
<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .loginLink,.pc{
    text-decoration: none;
    color: rgb(68, 68, 68);
  }
  .pc{
    margin-right: 20px;
  }
  span{
      margin-right: 20px;
  }
</style>