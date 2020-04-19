<template>
  <div class="about">
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID"  width="230">
      </el-table-column>
      <el-table-column prop="userName" label="管理员姓名" width="100">
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push(`/admin/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
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
      const res = await this.$http.get('admins')
      this.items = res.data
      // console.log(this.items)
    },
    async remove(row){
      this.$confirm(`是否确定移除管理员 "${row.username}"`, '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(async() => {
            await this.$http.delete(`admins/${row._id}`)
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
