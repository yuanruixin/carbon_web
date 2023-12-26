<template>
  <el-scrollbar>
    <div class="container">
      <section class="city-environment">
        <div class="header">
          <div class="city-name">
            <h2 ref="title">{{ cityName ?? "北京" }}</h2>
            <p>城市双碳指数</p>
          </div>
          <div class="search-container">
            <span for="">查询其他城市:</span>
            <el-input v-model="inputValue" placeholder="输入其他城市的名称" style="height:40px" @keyup.enter="pushWithQuery">
              <template #append>
                <el-button @click="pushWithQuery"> 搜索</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <div class="section-content">
          <ChartCities class="city-map"></ChartCities>
          <ChartCarbonIndex class="city-chart"></ChartCarbonIndex>
        </div>
      </section>
      <SectionContainer title="气候雄心" icon="target">
        <div class="section-content">
          <TargetCircle :date="carbonTargrt.peak" text="碳达峰目标年" />
          <TargetCircle :date="carbonTargrt.neutral" text="碳中和目标年" />
        </div>
      </SectionContainer>
      <SectionContainer title="低碳状态" icon="status">
        <div class="section-content  carbon-state">
          <!-- 总碳排放量直方图 -->
          <ChartCarbonTotal class="chart"/>
          <!-- 能源结构扇形图 -->
          <PieEnergyStruct class="chart"/>
          <!-- 人均碳排放直方图 -->
          <ChartCarbonPer class="chart" />
          <!-- 单位GDP碳排放直方图 -->
          <ChartCarbonPerGdp class="chart"/>
          <!-- 碳排放趋势折线图 -->
          <ChartEmissionTrend class="chart"/>
        </div>
      </SectionContainer>
    </div>

  </el-scrollbar>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCityDetailStore from '@/store/cityDetail'
import useCitiesStore from '@/store/cities'

import ChartCarbonIndex from './components/Charts/ChartCarbonIndex.vue'
import ChartCities from './components/Charts/ChartCities.vue'
import TargetCircle from './components/TargetCircle.vue'
import SectionContainer from './components/SectionContainer.vue'
import ChartCarbonTotal from "./components/Charts/ChartCarbonTotal.vue"
import PieEnergyStruct from "./components/Charts/PieEnergyStruct.vue"
import ChartCarbonPer from "./components/Charts/ChartCarbonPer.vue"
import ChartCarbonPerGdp from "./components/Charts/ChartCarbonPerGdp.vue"
import ChartEmissionTrend from './components/Charts/ChartEmissionTrend.vue'

const router = useRouter()
const route = useRoute()

const inputValue = ref('')



const cityDetailStore = useCityDetailStore()
const cityiesStore = useCitiesStore()


/**
 * 更新城市信息
 * @function
 * @memberOf cityDetailStore
 * @param {string} city - 城市名称
 * @returns {void}
 */
const updateCity = cityDetailStore.updateCity
const { carbonTargrt,cityName } = storeToRefs(cityDetailStore)
const { cities } = storeToRefs(cityiesStore)

watch(() => route.query.city, (newValue) => {
  updateCity(newValue)
},{immediate:true})

function pushWithQuery() {
  if (!cities.value.includes(inputValue.value)) {
    return ElMessage({
      type: "error", message: "非法查询或输入城市不存在"
    })
  } else {
    router.push({
      name: "cityDetail",
      query: {
        city: inputValue.value
      }
    })
  }
}

</script>

<style scoped lang="scss">
.container {
  height: calc(100vh - 60px - 2px);
  margin-top: 2px;
  padding-top: 12px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;

  section {
    margin: 0 clamp(10px,5vw,200px);
    padding: clamp(10px,10vh,32px) clamp(10px,5vw,50px);
    box-shadow: rgba(14, 92, 254, 0.2) 0 1px 16px 4px;
    border-radius: 20px;
    background-color: #fff;
    background-attachment: fixed;
  }
}

.city-environment {

  .header {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
    align-items: center;
    justify-content: space-between;
    justify-items: start;
    column-gap: 40px;
    .city-name {
      max-width: 300px;
      font-size: clamp(12px,4vw,20px);
      display: flex;
      flex-direction: column;
      align-items: center;

      h2 {
        font-size: 2em;
      }

      p {
        font-size: 1em;
      }
    }

    .search-container {
      justify-self: end;
      max-width: 300px;
      display: grid;
      grid-template-columns: repeat(2,minman(200px,1fr));
      align-items: center;
      column-gap: 24px;
    }
  }

}

.section-content {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(max(30vw,200px),1fr));
  gap: 40px;
  .chart{
    justify-self: center;
    width: 80%;
    aspect-ratio: 1 / 1;
  }

}

</style>