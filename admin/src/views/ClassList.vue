<template>
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
       <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push(`/class/edit/${scope.row._id}`)">编辑</el-button>
        <!-- <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
      
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return {
      items:[]
    }
  },
  methods:{
    async fetch(){
      const res = await this.$http.get('class')
      this.items = res.data
    },



    async remove(row){
      this.$confirm(`是否确定删除学生 "${row.name}"`, '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(async() => {
            await this.$http.delete(`class/${row._id}`)
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.fetch()
          })
    }
  },
  created(){
    this.fetch()
  }
}
</script>
