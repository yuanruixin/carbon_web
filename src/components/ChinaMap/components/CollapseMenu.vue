<template>
  <div class="side-pannel" :class="{ 'show-slide-pannel': showMenu }">
    <el-scrollbar>
      <el-card class="side-content">
        <template #header>
          <div class="card-header">
            <span>双碳地图</span>
          </div>
        </template>
        <el-input v-model="position" placeholder="搜索地域">
          <template #prepend>
            <el-button :icon="Search" />
          </template>
          <template #append>
            <el-button type="primary"> 搜索</el-button>
          </template>
        </el-input>
        <div class="select-container">
          <div class="year-select">
            <p>年份</p>
            <el-select v-model="year" placeholder="Select" style="width: 240px">
              <el-option v-for="item in yearOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="air-select">
            <p>类型</p>
            <el-select v-model="gasType" placeholder="Select" style="width: 240px">
              <el-option v-for="item in gasOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <el-button type="primary" class="submit-btn">筛选</el-button>
        </div>
        <template #footer>数据来源介绍：lorem50</template>
      </el-card>
    </el-scrollbar>
    <el-button :icon="showMenu ? ArrowLeftBold : ArrowRightBold" class="arrow-btn" @click="showMenu = !showMenu" />
  </div>
</template>

<script  setup>
import { ref } from 'vue'
import { ArrowRightBold, ArrowLeftBold, Search } from '@element-plus/icons-vue';
const showMenu = ref(true)
const position = ref('')

const year = ref('2020')
const yearOptions = [
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
]
const gasType = ref('1')

const gasOptions = [
  { value: '1', label: '城市数据' },
  { value: '2', label: 'NPP' },
]



</script>

<style scoped lang="scss">
.side-pannel {
  --silde-width: 350px;

  width: var(--silde-width);
  will-change: translateX;
  transform: translateX(calc(0px - var(--silde-width)));
  transition: all 0.3s ease-in;
  .side-content {
    height: 100%;
    overflow: auto;
  }
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
</style>