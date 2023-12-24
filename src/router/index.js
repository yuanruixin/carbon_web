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
    path: '/cityDetail/:city?',
    component: () => import("@/pages/city/CityDetail.vue"),
    props: route => ({
      city: route.query.city || '北京'
    })
  },
  {
    path: '/',
    redirect: '/map'
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})