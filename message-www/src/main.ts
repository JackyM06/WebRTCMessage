import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import socketIO from "@/plugins/socket-io";


createApp(App)
.use(router)
.use(socketIO, {
    connection: 'ws://localhost:3000',
    options: {
        autoConnect: false, //关闭自动连接
    }
})
.mount('#app')
