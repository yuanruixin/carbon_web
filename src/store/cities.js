import { defineStore } from 'pinia';
import { ref ,computed} from 'vue'
import { getAllCityIndex } from "@/api/index"
const useCitiesStore = defineStore('cities', () => {
  // 所有城市的双碳指数数据
  const citiesIndex = ref([
    {city:"深圳",score:76.02}
  ])
  const cities = computed(()=>{
    return citiesIndex.value.map(item=>item.city)
  })
  async function updateStore() {
    await getAllCityIndex().then(
      (res) => {
        citiesIndex.value = res.data
      }
    )
  }
  return {
    citiesIndex,
    cities,
    updateStore
  }
})

export default useCitiesStore