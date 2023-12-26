碳排放趋势多年直方图
<template>
  <div id="emission-trend">

  </div>
</template>

<script setup>
import { watch, onMounted,computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Chart } from "@antv/g2"
import useCityDetailStore from "@/store/cityDetail.js"
const cityDetailStore = useCityDetailStore()
const { emissionTrend } = storeToRefs(cityDetailStore)

let chart = null

const chartData = computed(() => {
  const { xcarbondata, ycarbondata, ygdpdata } = emissionTrend.value
  return xcarbondata.map((item, index) => ( { year: xcarbondata[index], "碳排放增速": ycarbondata[index], "GDP增速": ygdpdata[index] }))
})


watch(() => chartData.value, (newValue) => {
  renderChart(newValue)
})

function renderChart(data, option) {
  const defaultOption = {
    title:"强脱钩"
  }
  option = Object.assign(defaultOption,option)
  const title = option.title

  if (chart !== null) {
    return upadteMap()
  }
  // 只会更新数据，不重新渲染
  function upadteMap() {
    chart
      .data(data)
      .title({
        size: 60,
        align: 'center',
        title: `脱钩指数:${title}`,
      })
  }
  chart = new Chart({
    container: "emission-trend",
    autoFit: true,
  });

  chart.data(data)
  chart
    .axis('x', {
      title: false
    })
    .title({
      size: 60,
      align: 'center',
      title: `脱钩指数:${title}`,
    })

  chart
    .line()
    .encode('x', 'year')
    .encode('y', '碳排放增速')
    .scale('color', 'red')
    .style('stroke', '#fe6f69')
    .encode('shape', 'smooth')
    .style('lineWidth', 2);
  chart
    .line()
    .encode('x', 'year')
    .encode('y', 'GDP增速')
    .style('stroke', 'steelblue')
    .encode('shape', 'smooth')
    .style('lineWidth', 2);
  chart.render();
}

</script>

<style lang="scss" scoped>

</style>