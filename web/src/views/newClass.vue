<template>
    <div>
        <h1>{{id? '修改':'新建'}}课程</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="课程编号">
                <el-input v-model="model.cno"></el-input>
            </el-form-item>
            <el-form-item label="课程描述">
                <el-input type="textarea" v-model="model.description"></el-input>
                
            </el-form-item>
            <el-form-item label="选择学生">
                <el-select v-model="model.students" multiple  placeholder="请选择学生">
                    <el-option v-for="item in studentList" :key="item.index" :value="item._id" :label="item.name" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="model.state">
                    <el-option value="1">正在上课</el-option>
                    <el-option value="0">已下课</el-option>
                </el-select>
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
            model:{},
            studentList:[],
            teacherId:''
        }
    },
    methods: {
        async save(){
            if(this.id){
                await this.$http.put(`class/${this.id}`,this.model)  
            }else{
                this.model.teacher = this.teacherId
                const res = await this.$http.post('class',this.model)
                this.model = res.data
            }
            
            this.$router.push('/classList')
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
        },
        getTeacher(){
            // console.log(sessionStorage)
            // console.log(sessionStorage.id)
            this.teacherId = sessionStorage.id
        }
    },
    created(){
        this.fetchStudentList()
        this.id && this.fetch()
        this.getTeacher()
    }
}
</script>