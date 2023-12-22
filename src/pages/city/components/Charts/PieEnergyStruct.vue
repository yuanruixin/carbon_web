<!-- 城市碳排放总量 多年直方图 -->
<template>
  <div id="energy-pie">

  </div>
</template>

<script setup>
import { watch, } from 'vue'
import { storeToRefs } from 'pinia'
import { Chart } from "@antv/g2"
import useCityDetailStore from "@/store/cityDetail.js"
const cityDetailStore = useCityDetailStore()
const { clearEnergy } = storeToRefs(cityDetailStore)

watch(() => clearEnergy.value, () => {
  const chartData = [
    { name: "非化石能源", value: clearEnergy.value, },
    { name: "其他", value: 1 - clearEnergy.value }]
  initChart(chartData)
})

function initChart(data) {
  const chart = new Chart({
    container: 'energy-pie',
    autoFit: true,
  });
  chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 });
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
    .transform({ type: 'stackY' })
    .encode('y', 'value')
    .encode('color', 'name')
    .scale('color', {
      range:["#30ce42","#808080"]
    })
    .legend("color",{
      layout: {
      justifyContent: 'center'
    }
    })
  chart.render();

}


</script>

<style lang="scss" scoped>
#energy-pie {
  height: 100%;
}
</style>