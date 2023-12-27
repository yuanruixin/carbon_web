<!-- 城市碳排放总量 多年直方图 -->
<template>
  <div id="energy-pie">

  </div>
</template>

<script setup>
import { watch, onMounted,computed} from 'vue'
import { storeToRefs } from 'pinia'
import { Chart } from "@antv/g2"
import useCityDetailStore from "@/store/cityDetail.js"
const cityDetailStore = useCityDetailStore()
const { clearEnergy } = storeToRefs(cityDetailStore)

let chart = null
const chartData = computed(()=>{

  return [
    { name: "非化石能源", value: clearEnergy.value, },
    { name: "其他", value: 1 - clearEnergy.value }]
})
watch(() => chartData.value, (newValue) => {
 
  initChart(newValue)
})

function initChart(data) {
  if(chart){
    chart.data(data)
  }
  chart = new Chart({
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
onMounted(()=>{
  initChart(chartData.value)
})

</script>

<style lang="scss" scoped>
@media screen and (min-width:900px) {
  #energy-pie{
    width: 60%;
  }
}
</style>