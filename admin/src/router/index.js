import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
//学生的路由
import StudentEdit from '../views/StudentEdit.vue'
import StudentList from '../views/StudentList.vue'
//课程的路由
import ClassEdit from '../views/ClassEdit.vue'
import ClassList from '../views/ClassList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path:'/students/create',component:StudentEdit},
      {path:'/students/edit/:id',component:StudentEdit, props: true},
      {path:'/students/list',component:StudentList},


      {path:'/class/create',component:ClassEdit},
      {path:'/class/edit/:id',component:ClassEdit, props: true},
      {path:'/class/list',component:ClassList}
    ]
  }
 
]

const router = new VueRouter({
  routes
})

export default router
