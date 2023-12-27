<template>
  <div class="side-pannel" :class="{ 'show-slide-pannel': showMenu }">
    <el-scrollbar max-height="800px">
      <el-card class="side-content">
        <template #header>
          <div class="card-header">
            <span>双碳地图</span>
          </div>
        </template>
        <div class="select-container">
          <div class="cities-select">
            <p>地图区域</p>
            <el-select v-model="area" placeholder="Select" style="width: 80%">
              <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="area-select" v-show="area === 'china'">
            <p>年份</p>
            <el-select v-model="year" placeholder="Select" style="width: 80%">
              <el-option v-for="item in yearOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="layer-select" >
            <p>图层类型</p>
            <el-select v-model="layerType" placeholder="Select" style="width: 80%">
              <el-option v-for="item in layerTypeOption" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <el-button type="primary" class="submit-btn" @click="sumbmitOption">筛选</el-button>
        </div>
        <template #footer>
          <div class="data-source" v-if="area === 'china'">
            <h4>数据及来源介绍</h4>
            <p class="caption"><b>净初级生产力</b>:NPP 即 Net primary productivity表示植被所固定的有机碳中扣除本身呼吸消耗的部分，也称净第一性生产力。NPP反映了植物固定和转化
              光合产物的效率，也决定了可供异养生物（包括各种动物和人）利用的物质和能量。</p>
            <p class="caption">
              通过使用谷歌地球引擎(Google Earth Engine,GEE)平台中的MODIS NPP数据集，对2010-2022年全国NPP图像
              进行预处理。预处理包括调用NPP数据集、转换波段单元、影像裁剪。
            </p>
          </div>
          <div v-else>
            <h4 class="data-source">数据及来源介绍</h4>
            <p class="caption"> <i>2015-2020世界各国森林变化面积数据</i>。数据来源Our World in Data</p>

          </div>

        </template>
      </el-card>
    </el-scrollbar>
    <el-button :icon="showMenu ? ArrowLeftBold : ArrowRightBold" class="arrow-btn" @click="showMenu = !showMenu" />
  </div>
</template>

<script  setup>
import { ref, computed,watch } from 'vue'
import { ArrowRightBold, ArrowLeftBold, Search } from '@element-plus/icons-vue';


const emit = defineEmits(["update-map"])

const showMenu = ref(true)

const year = ref('2020')
const area = ref("china")
const layerType = ref('NPP')
const yearOptions = ref([

  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
])

const layerTypeOption = computed(() => {
  if(area.value==="china") return [{ value: 'NPP', label: 'NPP' },]

  if(area.value==="world") {
    return [{ value: 'forest_change', label: '森林面积变化' }
  ]}
})

watch(()=>layerTypeOption.value,(layerOpt)=>{
  // 切换地图区域时，自动取图层类型的首个值
  layerType.value=layerOpt[0].value
})


const areaOptions = ref([
  { value: 'china', label: "中国" },
  { value: 'world', label: "世界" },
])
// 根据所选择的数据，向父组件传值，加载地图
function sumbmitOption() {
  emit('update-map', {
    area: area.value,
    detail: {
      type: layerType.value,
      year: year.value
    }
  })
}



</script>

<style scoped lang="scss">
.side-pannel {
  width: clamp(200px, 30vw, 350px);
  transform: translateX(-100%);
  transition: all 0.3s ease-in;
}

.show-slide-pannel {
  transform: translateX(0);
}

.select-container {
  display: flex;
  flex-direction: column;
}

.submit-btn {
  margin-top: 12px;
  padding: 6px 40px;
  align-self: end;
}

.arrow-btn {
  position: absolute;
  top: 12px;
  left: 100%;
  padding: 20px 6px;
}

.data-source {
  line-height: 1.25;

  .caption {
    font-size: 13px;
    color: gray;
  }
}

@media screen and (max-width:800px) {
  .data-source {
    display: none;
  }

  .arrow-btn {
    top: 60%;
  }
}
</style>