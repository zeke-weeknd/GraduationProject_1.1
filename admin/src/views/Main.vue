<template>
<el-container style="height: 100vh;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1','2', '3','4']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>管理学生</template>
        <el-menu-item-group>
          <template slot="title">学生</template>
          <el-menu-item index="/students/create">新建学生</el-menu-item>
          <el-menu-item index="/students/list">学生列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>管理课程</template>
        <el-menu-item-group>
          <template slot="title">课程</template>
          <el-menu-item index="/class/create">新建课程</el-menu-item>
          <el-menu-item index="/class/list">课程列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>管理教师</template>
        <el-menu-item-group>
          <template slot="title">教师</template>
          <el-menu-item index="/teacher/create">新建教师</el-menu-item>
          <el-menu-item index="/teacher/list">教师列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-message"></i>管理员</template>
        <el-menu-item-group>
          <template slot="title">管理员</template>
          <el-menu-item index="/admin/create">新建管理员</el-menu-item>
          <el-menu-item index="/admin/list">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <!-- <router-link to="localhost:8081/#/" class="pc">前往pc端</router-link> -->
        <!-- <a href="localhost:8081/#/">前往pc端</a> -->
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link to="/login" class="loginLink">切换账号</router-link></el-dropdown-item>
          
        </el-dropdown-menu>
      </el-dropdown>
      
      <span>{{username}}</span>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

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
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: localStorage.userName,
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        username: localStorage.userName
      }
    },
    created(){
      // console.log(localStorage)
      // this.item.name = localStorage
    }
  };
</script>