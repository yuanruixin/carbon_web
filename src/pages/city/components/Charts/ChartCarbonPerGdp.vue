<!-- 城市碳排放总量 多年直方图 -->
<template>
  <div id="gdp-carbon">

  </div>
</template>

<script setup>
import {watch,} from 'vue'
import {storeToRefs} from 'pinia'
import {Chart} from "@antv/g2"
import useCityDetailStore from "@/store/cityDetail.js"
const cityDetailStore = useCityDetailStore()
const {co2GdpData} = storeToRefs(cityDetailStore)

 watch(()=>co2GdpData.value,(newValue,oldvalue)=>{
   console.log(co2GdpData.value)
   const {xgdpdata,ygdpdata,yperdata_avg} = co2GdpData.value
   const chartData =  xgdpdata.map((item,index)=>({year:xgdpdata[index],"value":ygdpdata[index]}))
   initChart(chartData)
}) 

function initChart(data){
  const chart = new Chart({
    container: 'gdp-carbon',
    autoFit: true,
  });
  chart
    .axis("y", { title: "碳排放总量"})
    .axis("x", {  title: false })
    .title({
      size:60,
      align:'center',
      title:"单位GDP碳排放",
      subtitle:"（单位：吨二氧化碳当量/万元）"
    })
    
  // y轴单位标注
  chart
  .text()
  .style('fill', 'black')
  .style('textAlign', 'start')
  .style('dy', -5);

  chart
    .interval()
    .data(data)
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', 'value')
    .scale('color', {
      range:["#78c8f5","#ceed83"]
    })
  chart.render();
  return chart
}


</script>

<style lang="scss" scoped>
  #gdp-carbon{
    height: 100%;
  }
</style>