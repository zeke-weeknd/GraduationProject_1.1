# GraduationProject_1.1
毕业设计（学生考勤签到系统）

## 2020.4.17 
mkdir 创建server文件夹 创建服务端
    npm init -y 初始化服务端，生成package.json文件，其中制定了入口文件为index.js，创建index.js文件作为项目的入口文件
    在script脚本中新建一个指令用来快速启动项目：nodemon index.js nodemon是一个插件，启动项目用的，需要安装
安装express框架和mongoose、core express要安装下一个版本的@next



vue create web 创建前端web项目，编写界面


vue create admin 创建后台数据管理页面
    安装elementUI,是用elementUI搭建后台管理页面
    此时初始页面已经有按钮，但是还没有路由跳转的功能，使用vue add router 安装路由器
    在elementui官网拿取组件来使用，配置好路由器，界面初始化完成

    安装axios向后台提交请求，创建http.js来专门写请求接口功能