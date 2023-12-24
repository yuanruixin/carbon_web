<template>
  <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false">
    <el-menu-item 
      v-for="(item,index) in tapItems" 
      :index.string="''+index" 
      :key="index">
      
      <router-link :to="item.path">{{ item.text }}</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script  setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()


const tapItems = [
  {
    id:'0',path: "/map", text: "双碳地图"
  },
  {
    id:'1',path: "/cityDetail", text: "城市",
  }
]
const activeIndex = ref('32')
// 当其他方式路由切换时，导航栏的active也能触发
watch(() => route.path,(newPath)=>{
  const index = tapItems.findIndex(item=>item.path===newPath)
  activeIndex.value = String(index)
})

</script>

<style scoped></style>
