import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    component: () => import("@/pages/home/Home.vue")
  },
  {
    name:"cityDetail",
    path: '/cityDetail/:city?',
    component: () => import("@/pages/city/CityDetail.vue"),
    props: route => ({
      city: route.query.city || '北京'
    })
  },
  {
    path: '/',
    redirect: '/home'
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})