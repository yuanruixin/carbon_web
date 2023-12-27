<template>
  <div class="map-container">
    <CollapseMenu class="collapse-menu" @update-map="updateLayers"></CollapseMenu>
    <div class="map">
      <ChinaMap v-if="mapArea === 'china'" v-bind="ChinaMapOption"></ChinaMap>
      <ForestChange v-else></ForestChange>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ForestChange from './components/ForestChange.vue'
import ChinaMap from './components/ChinaMap.vue';
import CollapseMenu from './components/CollapseMenu.vue';
const mapArea = ref('china')

const ChinaMapOption = ref({
  type: 'npp',
  year: 2022
})
function updateLayers(option) {
  const area = option.area
  mapArea.value = area

  if (option.area === 'china') {
    let defaultOption = {
      type: 'npp',
      year: 2022
    }
    option = Object.assign(defaultOption, option.detail)
    ChinaMapOption.value = option
  }
}

</script>

<style lang="scss" scoped>
.map-container {
  height: calc(100vh - 60px);

  position: relative;
  overflow: hidden;

  .collapse-menu {
    position: absolute;
    z-index: 10;
  }
  .map{
    height: 100%;
  }
}
</style>