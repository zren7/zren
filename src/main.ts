import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import './styles/index.scss'

// 引入状态管理
import { setupStore } from '@/store'

// 路由
import router, { setupRouter } from '@/router'

const app = createApp(App)
setupStore(app)
setupRouter(app)
await router.isReady()
app.mount('#app')
