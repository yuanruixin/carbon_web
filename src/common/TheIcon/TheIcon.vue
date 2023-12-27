<template>
  <svg class="svg-wrapper">
    <use :href="`${sprite}#icon-${icon}`"  :height='height' :width="width"> </use>
  </svg>
</template>
 
<script setup>
// 使用动态属性时，不能直接写图片路径需要使用import导入
import sprite from "@/assets/icons/sprite.svg";
defineProps({
  icon: {
    default:'target',
    validator(value) {
      return ['target', 'status'].includes(value)
    }
  },
  width:{
    default:68,
    type:Number
  },
  height:{
    default:68,
    type:Number
  }
})
</script>
 
<style scoped>
.svg-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}
 .icon{
  width: 100%;
  height: 100%;
}
</style>