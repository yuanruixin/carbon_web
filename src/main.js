import { createApp } from 'vue'
import 'normalize.css'
import './style.css'
import App from './App.vue'

import router from './router/index'
import {createPinia} from 'pinia'
import '@/mock'
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
