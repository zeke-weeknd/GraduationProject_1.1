import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import StudentEdit from '../views/StudentEdit.vue'
import StudentList from '../views/StudentList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path:'/students/create',component:StudentEdit},
      {path:'/students/edit/:id',component:StudentEdit, props: true},
      {path:'/students/list',component:StudentList}
    ]
  }
 
]

const router = new VueRouter({
  routes
})

export default router
