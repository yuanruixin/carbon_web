import { defineStore } from 'pinia';
import { ref } from 'vue'
import { getCarbonIndex, getCityState,getCityAmbition,getEmissionTrend } from '@/api'
const useCityDetailStore = defineStore('cityDetail', () => {
  // 当前查询城市
  const cityName = ref("北京")
  // 城市双碳指数各组成条目
  const cityIndexData = ref({
    nameArr: [],
    seriesData: [],
    qzArr: []
  })
  // 碳达峰与碳中和的目标年
  const carbonTargrt = ref({
    peak: 2030,
    neutral: 2050
  })
  // 城市总碳排放数据
  const co2Data = ref({
    xco2data: [],
    yco2data: []
  })
  // 城市人均碳排放数据
  const co2PerData = ref({
    xco2data: [],
    yperdata: [],
    yperdata_avg: []
  })
  // 城市单位GDP排放数据
  const co2GdpData = ref({
    xgdpdata: [],
    ygdpdata: [],
    ygdpdata_avg: []
  })
  // 碳排放趋势
  const emissionTrend=ref({
    tuogouName:'强脱钩',
    xcarbondata:[],
    ycarbondata:[],
    ygdpdata:[]
  })
  // 非化石能源比重（总量为1）
  const clearEnergy = ref(0.2)
  /**
   * 根据城市名更新数据
   * @param {string} city  //城市名
   * @returns {void}
  */
  async function updateCity(city = "北京") {
    if(!city) city = "北京"
    cityName.value = city
    const indexRes = await getCarbonIndex(city)
    cityIndexData.value = indexRes.data
    // 城市低碳状态数据
    const cityStateRes = await getCityState(city)
    const { energy, xco2data, yco2data, yperdata, yperdata_avg, xgdpdata, ygdpdata, ygdpdata_avg } = cityStateRes.data
    clearEnergy.value = energy
    co2Data.value = { xco2data, yco2data }
    co2PerData.value = { xco2data, yperdata, yperdata_avg }
    co2GdpData.value = { xgdpdata, ygdpdata, ygdpdata_avg }
    // 城市气候雄心数据（碳达峰及碳中和目标年）
    const ambitionRes =  await getCityAmbition(city)
    carbonTargrt.value = ambitionRes.data
    // 碳排放趋势
    const trendData = await getEmissionTrend(city)
    emissionTrend.value = trendData.data
  }
  
  return {
    cityName,
    cityIndexData,
    carbonTargrt,
    co2Data,
    co2PerData,
    co2GdpData,
    clearEnergy,
    emissionTrend,
    // 函数
    updateCity
  }
})

export default useCityDetailStore