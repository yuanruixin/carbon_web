<template>
  <header class="header">
    <div class="logo-container">
      <router-link to="/home" class="logo"></router-link>
    </div>
    <TopNavBar></TopNavBar>
  </header>
</template>

<script setup >
import TopNavBar from './TopNavBar.vue'
</script>

<style lang="scss" scoped>
header {
  height: 60px;
  padding: 0 clamp(10px,5vw,60px);
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  box-shadow: 0px 4px 10px 0 rgba(61, 110, 255, 0.2);
}

.logo-container {
  width: 200px;
  height: 100%;
}

.logo {
  display: block;
  width: 100%;
  height: 60px;
  background: url("@/assets/logo.png") no-repeat;
  background-size: contain;
}
</style>