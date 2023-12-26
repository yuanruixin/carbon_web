<!-- 城市碳排放总量 多年直方图 -->
<template>
  <div id="total-carbon">

  </div>
</template>

<script setup>
import {watch,} from 'vue'
import {storeToRefs} from 'pinia'
import {Chart} from "@antv/g2"
import useCityDetailStore from "@/store/cityDetail.js"
const cityDetailStore = useCityDetailStore()
const {co2Data} = storeToRefs(cityDetailStore)

 watch(()=>co2Data.value,(newValue)=>{
   const {xco2data,yco2data} = newValue
   const chartData =  xco2data.map((item,index)=>({year:xco2data[index],"value":yco2data[index]}))
   initChart(chartData)
}) 

function initChart(data){
  const chart = new Chart({
    container: 'total-carbon',
    autoFit: true,
  });
  chart
    .axis("y", {
      title: "碳排放总量"
    })
    .axis("x", {
      title: false
    })
    .title({
      size:60,
      align:'center',
      title:"碳排放总量",
      subtitle:"（单位：万吨二氧化碳当量）"
    })
  chart
    .interval()
    .data(data)
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', '#963296')
  chart.render();
  return chart
}


</script>

<style lang="scss" scoped>
  
</style>