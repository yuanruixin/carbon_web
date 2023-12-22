import { defineStore } from 'pinia';
import { ref } from 'vue'
import { getAllCityIndex } from "@/api/index"
const useCitiesStore = defineStore('cities', () => {
  // 所有城市的双碳指数数据
  const carbonIndexes = ref({
    cities: [],
    values: []
  })

  async function updateStore() {
    await getAllCityIndex().then(
      (res) => {
        carbonIndexes.value = res.data
      }
    )
  }
  return {
    carbonIndexes,

    updateStore
  }
})

export default useCitiesStore