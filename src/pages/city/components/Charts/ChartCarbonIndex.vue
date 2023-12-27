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
import { isMobile } from '@/utils/isMobile.js'
const cityDetail = useCityDetailStore()
const { cityIndexData } = storeToRefs(cityDetail)

let chart = null

const chartData = computed(() => {
  const { nameArr, qzArr, seriesData } = cityIndexData.value
  return nameArr.map((item, index) => ({ "item": `${nameArr[index]}(${qzArr[index]})`, "得分": seriesData[index] }))
})

watch(() => chartData.value, (newData) => {
  initChart(newData)
})

function initChart(data) {
  if (chart !== null) {
    chart.data(data)
  }


  chart = new Chart({
    container: 'city-index',
    autoFit: true,
  });
  chart.coordinate({ type: 'polar' });

  chart
    .data(data)
    .scale('x', { padding: 0.5, align: 1 })
    .scale('y', { tickCount: 5 })
    .axis('x', {
      zIndex: 1,
      labelStrokeWidth: 5,
      titleFontSize: 8,
      title: false,
      labelTransform: 'rotate(0)',
      labelFontSize: 10,
      labelFormatter: ((datum) => {
        const index = datum.indexOf('(')
        if (isMobile()) {
          datum = datum.slice(0, index)
          const MAX_LENGTH = 6; // 最大显示长度
          return datum.length > MAX_LENGTH ? datum.slice(0, MAX_LENGTH) + '...' : datum;
        }

        return datum.slice(0, index) + '\n' + datum.slice(index)
      })
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