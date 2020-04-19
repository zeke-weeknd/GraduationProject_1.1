import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
//学生的路由
import StudentEdit from '../views/StudentEdit.vue'
import StudentList from '../views/StudentList.vue'
//课程的路由
import ClassEdit from '../views/ClassEdit.vue'
import ClassList from '../views/ClassList.vue'
//教师的路由
import TeacherEdit from '../views/TeacherEdit.vue'
import TeacherList from '../views/TeacherList.vue'
//管理员的路由
import AdminEdit from '../views/AdminEdit.vue'
import AdminList from '../views/AdminList.vue'

Vue.use(VueRouter)

  const routes = [
  {path:'/login',name: 'login',component:Login},//登陆页面的路由
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      //学生子路由
      {path:'/students/create',component:StudentEdit},
      {path:'/students/edit/:id',component:StudentEdit, props: true},
      {path:'/students/list',component:StudentList},

      //课程子路由
      {path:'/class/create',component:ClassEdit},
      {path:'/class/edit/:id',component:ClassEdit, props: true},
      {path:'/class/list',component:ClassList},

      //教师子路由
      {path:'/teacher/create',component:TeacherEdit},
      {path:'/teacher/edit/:id',component:TeacherEdit, props: true},
      {path:'/teacher/list',component:TeacherList},

      //管理员子路由
      {path:'/admin/create',component:AdminEdit},
      {path:'/admin/edit/:id',component:AdminEdit, props: true},
      {path:'/admin/list',component:AdminList}
    ]
  }
 
]

const router = new VueRouter({
  routes
})

export default router
