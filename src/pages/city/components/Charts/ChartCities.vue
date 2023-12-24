<!-- 所有双碳指数城市对比 直方图 -->
<template>
  <div class="city-chart" id="bg-chart">

  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Chart } from '@antv/g2';
import useCitiesStore from '@/store/cities';

import useCityDetailStore from '@/store/cityDetail'

const cityDetailStore = useCityDetailStore()
const citiesStore = useCitiesStore()
// 初始化仓库数据函数
const updateStore = citiesStore.updateStore
updateStore()
// 仓库数据
const { citiesIndex } = storeToRefs(citiesStore)
const {cityName} = storeToRefs(cityDetailStore)

// 更新表中数据
watch(() => [citiesIndex.value,cityName.value], (newValue) => {
  initChart(newValue[0], newValue[1])
})

// 传入数据，并使当前城市高亮
function initChart(data, currentCity) {
  const chart = new Chart({
    container: 'bg-chart',
    autoFit: true,
  });
  chart
    .axis("y", {
      title: false
    })
    .axis("x", {
      title: false
    })
  chart
    .interval()
    .data(data)
    .encode('x', 'city')
    .encode('y', 'score')
    .style('fill', (datum, index, data) => {
      if (datum["city"] === currentCity) {
        return getColor(datum["score"])
      };
      return '#78c9f5';
    });
  // chart
  chart.render();
}
function getColor(v) {
  if (v > 68) return "#1aaf54"
  if (v > 65) return "#2f8af0"
  if (v > 60) return "#f9d067"
  if (v > 55) return "#ec7d3c"
  if (v > 50) return "#be0612"
  return "#681f86"
}

onMounted(() => {

      initChart(citiesIndex.value, "北京")
})
</script>

<style scoped>
#bg-chart {
  border-radius: 20px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.4);
}
</style>