<!-- 城市人均碳排放 多年直方图 -->
<template>
  <div id="per-carbon">

  </div>
</template>

<script setup>
import {watch,} from 'vue'
import {storeToRefs} from 'pinia'
import {Chart} from "@antv/g2"
import useCityDetailStore from "@/store/cityDetail.js"
const cityDetailStore = useCityDetailStore()
const {co2PerData} = storeToRefs(cityDetailStore)

 watch(()=>co2PerData.value,()=>{
   const {xco2data,yperdata} = co2PerData.value
   const chartData =  xco2data.map((item,index)=>({year:xco2data[index],"value":yperdata[index]}))
   initChart(chartData)
}) 

function initChart(data){
  const chart = new Chart({
    container: 'per-carbon',
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
      title:"人均碳排放",
      subtitle:"（单位：吨二氧化碳当量/人）"
    })
  chart
    .interval()
    .data(data)
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', 'value')
    .scale('color', {
      range:["#ceed83","#f3d170"]
    })
  chart.render();
  return chart
}


</script>

<style lang="scss" scoped>
  #per-carbon{
    height: 100%;
  }
</style>