<!-- 城市碳排放总量 多年直方图 -->
<template>
  <div id="gdp-carbon">

  </div>
</template>

<script setup>
import { watch, ref, unref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Chart } from "@antv/g2"
import useCityDetailStore from "@/store/cityDetail.js"
const cityDetailStore = useCityDetailStore()
const { co2GdpData } = storeToRefs(cityDetailStore)


let chart = null
watch(() => co2GdpData.value, (newValue) => {
  const { xgdpdata, ygdpdata, ygdpdata_avg } = newValue
  const chartData = xgdpdata.map((item, index) => ({ year: xgdpdata[index], "单位GDP排放": ygdpdata[index], "平均值": ygdpdata_avg[index] }))
  renderChart(chartData)
})


function renderChart(data) {
  if (chart !== null) {
    return chart.data(data)
  }

  chart = new Chart({
    container: 'gdp-carbon',
    autoFit: true,
  });
  chart.data(data)
  chart
  .title({
      size: 60,
      align: 'center',
      title: "单位GDP碳排放",
      subtitle: "（单位：吨二氧化碳当量/万元）"
    })
    
  chart
    .line()
    .axis("x", { title: false })
    .encode('x', 'year')
    .encode('y', '平均值')
    .scale('y', { domainMax: 4, domainMin: 0 })

    chart
    .interval()
    .encode('x', 'year')
    .encode('y', '单位GDP排放')
    .encode('color', '单位GDP排放')
    .axis("y", { title: "碳排放总量" })
    .axis("x", { title: false })
    .legend(false),

    
    
  

  chart.render();
  return chart
}

</script>

<style lang="scss" scoped>

</style>