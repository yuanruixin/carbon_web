import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './style.css'
import 'nprogress/nprogress.css'

import router from './router/index'
import {createPinia} from 'pinia'
// import '@/mock'
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
