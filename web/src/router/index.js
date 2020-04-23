import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Index from '../views/Index.vue'

import Login from '../views/login'
import login1 from '../views/login-1'
import register from '../views/register'




import ClassEdit from '../views/ClassEdit'
import newClass from '../views/newClass'
import classList from '../views/ClassList'



import startClass from '../views/startClass'
import classMessage from '../views/classMessage'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    // props:true
  },
  //新建课程的路由
  {
    path:'/function',
    name: 'ClassEdit',
    component: ClassEdit,
    // props:true,
    children:[
      {path:'/newClass',component:newClass},
      {path:'/newClass/:id',component:newClass,props:true},
      {path:'/classList',component:classList}
    ]
  },

  //登录的路由
  {
    path: '/login',
    name: 'login',
    component: Login,
    children:[
      {path:'/login-1',component:login1},
      {path:'/register',component:register}
    ]
  },

  //开始上课路由
  {
    path:'/startClass',
    name:'startClass',
    component:startClass
  },
  {
    path:'/classMessage/:id',
    name:'classMessage',
    component:classMessage,
    props:true
  },

  
]

const router = new VueRouter({
  routes
})

export default router
