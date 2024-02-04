import { createApp } from 'vue'
import './style.css'
import router from "./router/index"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

console.log(import.meta.env)

createApp(App)
//整个应用支持路由
    .use(router)
    .use(ElementPlus)
.mount('#app')
