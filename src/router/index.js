import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:"/home",
    component:()=>import("@/pages/home/Home.vue")
  },
  {
    path: '/map',
    component: () => import("@/pages/map/Map.vue")
  },
  {
    name:"cityDetail",
    path: '/cityDetail',
    component: () => import("@/pages/city/CityDetail.vue"),
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