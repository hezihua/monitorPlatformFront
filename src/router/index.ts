// 1、按需引入方法
import { createRouter, createWebHashHistory } from "vue-router"
// 2、定义一些路由
const routes: any[]  = [
    {
        path: '/',
        children:[
            {
                path: '/home',
                name: 'home',
                component: ()=> import("../pages/home/index.vue"),
                meta:{
                    title: '首页',
                    icon: ''
                }
            },
            {
                path: '/about',
                name: 'about',
                component: ()=> import("../pages/about/index.vue"),
                meta:{
                    title: '关于',
                    icon: ''
                }
            }
        ]
    }
]
//3、创建路由实例
const router = createRouter({
  routes,
  history:createWebHashHistory("./")
})

export default router
