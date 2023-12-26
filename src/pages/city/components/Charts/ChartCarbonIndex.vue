<!-- 城市双碳指数详情（各条目雷达图） -->
<template>
  <div class="city-chart" id="city-index">

  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Chart } from '@antv/g2';
import useCityDetailStore from "@/store/cityDetail.js"


const cityDetail = useCityDetailStore()
const { cityIndexData } = storeToRefs(cityDetail)

let chart = null

const chartData = computed(() => {
  const { nameArr, qzArr, seriesData } = cityIndexData.value
  return nameArr.map((item, index) => ({ "item": `${nameArr[index]}\n(${qzArr[index]})`, "得分": seriesData[index] }))
})

watch(() => chartData.value, (newData) => {
  initChart(chartData.value)
})

function initChart(data) {
  if (chart !== null) {
    chart = null
    // chart.data(data)
    // chart.render()
  }

  chart = new Chart({
    container: 'city-index',
    autoFit: true,
  });
  chart.coordinate({ type: 'polar' });

  chart
    .data(data)
    .scale('x', { padding: 0.6, align: 1 })
    .scale('y', { tickCount: 5 })
    .axis('x', {
      zIndex: 1,
      labelStrokeWidth: 5,
      titleFontSize: 8,
      title: false,
      labelTransform: 'rotate(0)',
    })
    .axis('y', {
      zIndex: -1,
      title: false,
      gridAreaFill: '#eee',
    })


  chart
    .area()
    .encode('x', 'item')
    .encode('y', '得分')
    .style('fill', 'steelblue')
    .encode('shape', 'smooth')
    .style('fillOpacity', 0.5)
    .scale('y', { domainMax: 100 });

  chart
    .line()
    .encode('x', 'item')
    .encode('y', '得分')
    .style('stroke', 'steelblue')
    .encode('shape', 'smooth')
    .style('lineWidth', 2); 
  chart.render();
}

</script>

<style scoped>
#city-index {
  border-radius: 20px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.4);
}
</style>