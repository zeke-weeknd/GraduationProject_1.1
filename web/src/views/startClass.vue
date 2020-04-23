<template>
      <el-container style="height: 100vh;">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu router :default-openeds="['1','2', '3','4']">
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>管理课程</template>
                <el-menu-item-group>
                  <template slot="title">课程</template>
                  <el-menu-item index="">课程列表</el-menu-item>
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
                  <div class="about">
                    <h1>课程列表</h1>
                    <el-table :data="items">
                      <el-table-column prop="_id" label="ID"  width="230">
                      </el-table-column>
                      <el-table-column prop="name" label="课程名称" width="100">
                      </el-table-column>
                      <el-table-column prop="cno" label="课程号" width="120">
                      </el-table-column>
                      <el-table-column prop="state" label="上课情况" width="100">
                      </el-table-column>
                      <el-table-column prop="students" label="学生">
                      </el-table-column>
                      <el-table-column prop="teacher.name" label="任课教师">
                      </el-table-column>
                       <el-table-column
                      fixed="right"
                      label="操作"
                      width="180">
                      <template slot-scope="scope">
                        <el-button type="text" size="small" @click="$router.push(`/classMessage/${scope.row._id}`)">进入课程</el-button>
                        <!-- <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button> -->
                      </template>
                    </el-table-column>

                    </el-table>
                  </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data(){
    return{
      items:[],
      username:sessionStorage.name,
      id:sessionStorage.id
    }
  },
  methods:{
    async fetch(){
      const res = await this.$http.get(`classlist/${this.id}`)
      this.items = res.data
      // console.log(res.data)
      // console.log(this.items)
    },
  },
  created() {
    this.fetch()
  },
}
</script>
