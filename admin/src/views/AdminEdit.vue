<template>
    <div>
        <h1>{{id? '修改':'新建'}}管理员</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="账号">
                <el-input v-model="model.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props:{
        id:{}
    },
    data(){
        return{
            model:{}
        }
    },
    methods: {
        async save(){
            // let res
            if(this.id){
                await this.$http.put(`admins/${this.id}`,this.model)
            }else{
                await this.$http.post('admins',this.model)
            }
            
            this.$router.push('/admin/list')
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`admins/${this.id}`)
            this.model = res.data
        }
    },
    created(){
        this.id && this.fetch()
    }
}
</script>