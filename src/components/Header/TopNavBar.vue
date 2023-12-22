<template>
  <el-menu :default-active="activeIndex" 
    mode="horizontal" 
  
    :ellipsis="false">
    <el-menu-item index="1">
      <router-link to="home">双碳地图</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="cityDetail">城市</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script  setup>
import { ref } from 'vue'

const activeIndex = ref('1')

</script>

<style scoped>
</style>
