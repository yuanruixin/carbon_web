<template>
  <div class="container">
    <CollapseMenu class="collapse-menu" @update-map="updateLayers"></CollapseMenu>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Scene, PointLayer, Control, Popup, RasterLayer, PolygonLayer, DOM } from '@antv/l7'
import { GaodeMapV1 } from '@antv/l7-maps';
// import request from '@/utils/request.js'
import { getNppFile } from '@/api/index.js'
import * as GeoTIFF from 'geotiff';
import CollapseMenu from './CollapseMenu.vue';
import citiesPosition from "../assets/citiesPosition.json"

// 创建地图
let scene = null
// 
const styleElement = document.createElement('style');

// 在<style>元素中添加样式规则
styleElement.textContent = `
            .info {
                padding: 6px 8px;
                font: 14px/16px Arial, Helvetica, sans-serif;
                background: white;
                background: rgba(255,255,255,0.8);
                box-shadow: 0 0 15px rgba(0,0,0,0.2);
                border-radius: 5px;
            }
            .info h4 {
                margin: 0 0 5px;
                color: #777;
            }
            .legend {
                line-height: 18px;
                color: #555;
            }
            .legend i {
                width: 40px;
                height: 20px;
                float: left;
                margin-top: 5px;
                margin-right: 0px;
                opacity: 1;
                color: #000;
                font-weight: bold;
            }
            `;

// 将<style>元素添加到<head>元素中，实现样式注入
document.head.appendChild(styleElement);
function initMap() {
  scene = new Scene({
    id: 'map',
    map: new GaodeMapV1({
      center: [99.288144, 38.239692],
      pitch: 0,
      zoom: 3.5,
      token: '1cb9598ad3fd4bd4ae11ac5e960dcc77',
    })
  })
  // 添加图例
  const legend = new Control(
    { position: 'bottomright' }
  )

  legend.onAdd = () => {
    let div = DOM.create('div', 'info legend')
    let grades = [0, '400', '700', '1000', '>2000', 'g/ (m2·a)']
    let grades2 = [0, 45, 55, 60, 65,'']
    let colors = ['rgb(194, 82, 60)', 'rgb(242, 191, 12)', 'rgb(77, 217, 67)', 'rgb(23, 181, 104)', 'rgb(11, 44, 123)'];
    let colors2 = ["#681f86", "#be0612", "#ec7d3c", "#2f8af0", "#1aaf54"];

    for (let i = 0; i < grades.length; i++) {
      if (i < grades.length - 1) {
        div.innerHTML += '<i style="background:' + colors[i] + '"></i>';
      }
      else {
        div.innerHTML += '<i style=" width: 60px; margin-left: 10px;">NPP数据</i><br>';
      }
    }
    for (let i = 0; i < grades.length; i++) {
      if (i < grades.length - 1) {
        div.innerHTML += `<i>${grades[i]}</>`
      } else {
        div.innerHTML += `<i style=" width: 60px;">${grades[i]}</i><br>`
      }
    }

    for (let i = 0; i < grades2.length; i++) {
      if (i < grades2.length - 1) {
        div.innerHTML += '<i style="background:' + colors2[i] + '"></i>';
      }
      else {
        div.innerHTML += '<i style=" width: 60px; margin-left: 10px;">双碳指数</i><br>';
      }
    }
    for (let i = 0; i < grades2.length; i++) {
      if (i < grades2.length - 1) {
        div.innerHTML += `<i>${grades2[i]}</>`
      } else {
        div.innerHTML += `<i style=" width: 60px;">${grades2[i]}</i><br>`
      }
    }

    return div;
  }

  scene.addControl(legend)
}

// 更新地图函数
function updateLayers(option) {
  let defaultOption = {
    type: 'npp',
    year: 2022
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
   
    // 为点图层添加LayerPopup
    addLayerPopup(scene.getLayerByName("pointLayer_city"))

  });
  // 添加点图层
  function initMarkers() {
    Promise.resolve(citiesPosition)
      .then(data => {
        const pointLayer = new PointLayer({
          name: "pointLayer_city",
          zIndex: 1
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
    const response = await getNppFile(year)
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
  if (nppRasterLayer) {
    scene.removeLayer(nppRasterLayer);
  }
  fetch(
    'https://gw.alipayobjects.com/os/basement_prod/d2e0e930-fd44-4fca-8872-c1037b0fee7b.json',
  )
    .then((res) => res.json())
    .then(async (maskData) => {

      const tiffdata = await getTiffData();
      const polygonLayer = new PolygonLayer({
        zIndex: 0,
        visible: false
      }).source(maskData).shape('fill').color('#f00').style({ opacity: 0.5 });
      const layer = new RasterLayer({
        name: 'nppRaster',
        maskLayers: [polygonLayer],
        zIndex: 0
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
            positions: [0, 0.0002, 0.1215, 0.2392, 0.3725, 0.5686, 1],
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
    position: relative;
  }
}

@media screen and (max-width:800px) {
  :deep() .l7-control-container{
    display: none;
  }
}
</style>