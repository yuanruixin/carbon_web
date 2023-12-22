<!-- 城市双碳指数详情（各条目雷达图） -->
<template>
  <div class="city-chart" id="city-index">

  </div>
</template>

<script setup>
import { onMounted, watch,ref } from 'vue'
import { Chart } from '@antv/g2';
import { getCarbonIndex } from "@/api/index.js"
const props = defineProps({
  city:{
    type:String,
    default:'北京'
  }
})

let chart = ref(null)

async function getCityData(city = "北京") {
  let res = await getCarbonIndex(city)
  const { nameArr, qzArr, seriesData } = res.data

  return nameArr.map((item, index) => ({ "item": `${nameArr[index]}\n(${qzArr[index]})`, "得分": seriesData[index] }))
}

watch(() => props.city
  , (newValue) => {
    getCityData(newValue).then(data => {
      chart.changeData(data)
    })
  })
function initChart(data) {
  chart = new Chart({
    container: 'city-index',
    autoFit: true,
  });
  chart.coordinate({ type: 'polar' });

  chart
    .data(data)
    .scale('x', { padding: 0.5, align: 0 })
    .scale('y', { tickCount: 5 })
    .axis('x', {
      zIndex: 1,
      labelSpacing: 4,
      labelTransform: 'rotate(0)'
    })
    .axis('y', {
      zIndex: -1,
      title: false,
      gridAreaFill: '#eee',
    });


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



  chart.interaction('tooltip', {
    crosshairsLineDash: [4, 4],

  });

  chart.render();
}

onMounted(() => {
  getCityData(props.city).then(data => {
    initChart(data)
  })

})
</script>

<style scoped>
#city-index {
  border-radius: 20px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.4);
}
</style>