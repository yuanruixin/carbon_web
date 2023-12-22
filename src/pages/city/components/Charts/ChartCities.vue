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
const props = defineProps({
  city: {
    type: String,
    default: '北京'
  }
})

const citiesStore = useCitiesStore()
// 初始化仓库数据函数
const updateStore =  citiesStore.updateStore

// 仓库数据
const { carbonIndexes } = storeToRefs(citiesStore)

async function initChartData(){
  await updateStore()
  const { cities, values } = carbonIndexes.value
  return cities.map((item, index) => ({ "城市": cities[index], "双碳指数": values[index] }))
}



watch(() => props.city, () => {
  initChartData()
    .then((data) => {
      initChart(data, props.city)
    })
})

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
    .encode('x', '城市')
    .encode('y', '双碳指数')
    .style('fill', (datum, index, data) => {
      if (datum["城市"] === currentCity) {
        return getColor(datum["双碳指数"])
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
  initChartData()
    .then((data) => {
      initChart(data, props.city)
    })
})
</script>

<style scoped>
#bg-chart {
  border-radius: 20px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.4);
}
</style>