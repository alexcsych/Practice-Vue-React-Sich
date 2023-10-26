import store from './store.js'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'

const routes = [
  { path: '/', component: Students },
  { path: '/student-info/:id', component: StudentInfo, props: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(store).use(router).mount('#app')
