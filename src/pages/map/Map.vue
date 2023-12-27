<template>
  <div>
    <ChinaMap></ChinaMap>
  </div>
</template>

<script setup>
import ChinaMap from './components/ChinaMap.vue';
import { once } from "@/utils/once.js"
import { isMobile } from '@/utils/isMobile.js'

function mobilePrompt() {
  if (isMobile())
    ElMessage({
      type: 'warning', message: "当前地图对移动端支持暂不稳定，请使用电脑获得更好的体验",
      offset:60
    })
}

let func = once(mobilePrompt)
func()

</script>

<style lang="scss" scoped></style>