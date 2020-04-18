<template>
    <div>
        <h1>{{id? '修改':'新建'}}学生</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="学号">
                <el-input v-model="model.sno"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="model.sex">
                    <el-option value="男">男</el-option>
                    <el-option value="女">女</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否签到">
                <el-select v-model="model.isScande">
                    <el-option value="1">是</el-option>
                    <el-option value="0">否</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否被绑定">
                <el-select v-model="model.isBind">
                    <el-option value="1">是</el-option>
                    <el-option value="0">否</el-option>
                </el-select>
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
                await this.$http.put(`students/${this.id}`,this.model)
            }else{
                await this.$http.post('students',this.model)
            }
            
            this.$router.push('/students/list')
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`students/${this.id}`)
            this.model = res.data
        }
    },
    created(){
        this.id && this.fetch()
    }
}
</script>