<template>
  <div class="container">
    <CollapseMenu class="collapse-menu" @update-map="updateLayers"></CollapseMenu>
    <div id="map" ></div>
  </div>
</template>

<script setup>
import { onMounted, } from "vue";
import { Scene, PointLayer, Control, Popup, RasterLayer, PolygonLayer } from '@antv/l7'
import { GaodeMapV1 } from '@antv/l7-maps';
import request from '@/utils/request.js'
import * as GeoTIFF from 'geotiff';
import CollapseMenu from './CollapseMenu.vue';
import citiesPosition from "../assets/citiesPosition.json"

// 创建地图
let scene = null
// 

function initMap() {
  scene = new Scene({
    id: 'map',
    map: new GaodeMapV1({
      center: [99.288144, 38.239692],
      pitch: 0,
      zoom: 3.5,
      minZoom: 4.5,
      token: '1cb9598ad3fd4bd4ae11ac5e960dcc77',
    })
  })
}
// 根据情况，选择加载哪一种图层
// 存在问题：重复加载图层会重复渲染
// （预期：已经渲染了，再次执行不渲染。
// 需要更新，

// 更新地图函数

function updateLayers(option) {
  let defaultOption = {
    type:'npp',
    year:2022
  }
  option = Object.assign(defaultOption, option)
  loadMaskLayer(option.year)
}

// 1.加载 多城市指数 相关图层
function loadCitiesLayer() {
  scene.addImage(
    'marker',
    'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*BJ6cTpDcuLcAAAAAAAAAAABkARQnAQ'
  );
  scene.on('loaded', async () => {
    // 添加点图层
    await initMarkers()
    // 图例
    addLegend()
    // 为点图层添加LayerPopup
    addLayerPopup(scene.getLayerByName("pointLayer_city"))

  });
  // 添加点图层
  function initMarkers() {
    Promise.resolve(citiesPosition)
      .then(data => {
        const pointLayer = new PointLayer({
          name: "pointLayer_city",
          zIndex:1
        })
          .source(data, {})
          .shape('circle')
          .color('value', value => {
            return getColor(value)
          })
          .size("value",
            // [20,25,30]
            (v) => getSize(v)
          )
          .active({

          })
          .style({
            strokeWidth: 3,
            stroke: '#fff'
          });
        scene.addLayer(pointLayer);

      })
  };
  // 点图层的图例

  // 为点图层添加LayerPopup
  function addLayerPopup(pointLayer) {
    const popup = new Popup()
    scene.addPopup(popup);
    pointLayer.on('mouseenter', e => {
      const { lng, lat } = e.lngLat
      const { name, value } = e.feature.properties
      popup.setOptions({
        title: `<a href="/cityDetail?city=${name}"> ${name}</a>`,
        html: value,
        lngLat: {
          lng,
          lat,
        },
      })
    })
    scene.addPopup(popup);
  }
  // 添加图例
  function addLegend() {
    const legend = new Control({
      position: "bottomright"
    })
    legend.onAdd = function () {
      var el = document.createElement("div");
      el.className = "infolegend legend";
      var grades = [68, 65, 60, 55, 45, 0];
      let colors = ["#1aaf54", "#2f8af0", "#f9d067", "#ec7d3c", "#be0612", "#681f86"]
      for (var i = 0; i < grades.length; i++) {
        el.innerHTML +=
          '<span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:' + colors[i] + '"> </span> '
          + `<span style="vertical-align:middle"> ${grades[i]} </span><br>`

      }
      return el;
    };
    scene.addControl(legend)
  }

  function getColor(v) {
    if (v > 68) return "#1aaf54"
    if (v > 65) return "#2f8af0"
    if (v > 60) return "#f9d067"
    if (v > 55) return "#ec7d3c"
    if (v > 50) return "#be0612"
    return "#681f86"
  }
  function getSize(v) {
    if (v > 68) return 30
    if (v > 65) return 27
    if (v > 60) return 24
    if (v > 55) return 21
    if (v > 50) return 18
    return 15
  }
}
// 2.记载NPP掩膜相关图层
/**
* @param {number||string} year 
* @description 根据不同年份加载NPP地图
*/
function loadMaskLayer(year = 2020) {
  async function getTiffData() {
      const response = await request.get(
      `http://127.0.0.1:3007/download/npp/${year}.tif`,
      { responseType: 'blob'}
    );
    const arrayBuffer = await response.arrayBuffer();
    const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
    const image = await tiff.getImage();
    const width = image.getWidth();
    const height = image.getHeight();
    const values = await image.readRasters();
    return {
      data: values[0],
      width,
      height,
      min: 0,
      max: 20000,
    };
  }

  const nppRasterLayer = scene.getLayerByName('nppRaster')
  if(nppRasterLayer){
    scene.removeLayer(nppRasterLayer);
  }
  fetch(
    'https://gw.alipayobjects.com/os/basement_prod/d2e0e930-fd44-4fca-8872-c1037b0fee7b.json',
  )
    .then((res) => res.json())
    .then(async (maskData) => {
      
      const tiffdata = await getTiffData();
      const polygonLayer = new PolygonLayer({
        zIndex:0,
        visible: false
      }).source(maskData).shape('fill').color('#f00').style({ opacity: 0.5 });
      const layer = new RasterLayer({
        name:'nppRaster',
        maskLayers: [polygonLayer],
        zIndex:0
      });
      // 像元的最值
      const mindata = -0;
      const maxdata = 20000;
      layer
        .source(tiffdata.data, {
          parser: {
            type: 'raster',
            width: tiffdata.width,
            height: tiffdata.height,
            extent: [
            73.500156546659,
              3.7840161485822,
              135.14538113670,
              53.566540392046,
            ],
          },
        })
        .style({
          opacity: 0.8,
      
          domain: [mindata, maxdata],
          clampLow: true,
          rampColors: {
            colors: [
              'rgb(0,0,0,0)',
              'rgb(194, 82, 60)',
              'rgb(194, 82, 60)',
              'rgb(242, 191, 12)',
              'rgb(77, 217, 67)',
              'rgb(23, 181, 104)',
              'rgb(11, 44, 123)',
            ],
            // 各种颜色的区间
            positions: [0,0.0002,0.1215, 0.2392, 0.3725, 0.5686,1],
          },
        });
       
      scene.addLayer(layer);
      scene.addLayer(polygonLayer);
    });
}
onMounted(() => {
  initMap()
  loadCitiesLayer()
  loadMaskLayer()
})



</script>

<style scoped lang="scss">
.container {
  height: calc(100vh - 60px);

  position: relative;
  overflow: hidden;

  .collapse-menu {
    position: absolute;
    height: 100%;
    z-index: 20;
  }

  #map {
    height: 100%;
  }

}
</style>