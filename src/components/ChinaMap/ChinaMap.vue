<template>
  <div class="container">
    <CollapseMenu class="collapse-menu"></CollapseMenu>
    <div id="map"></div>
  </div>
</template>

<script setup>
import CollapseMenu from './components/CollapseMenu.vue';
import { onMounted, ref } from "vue";
import { Scene, PointLayer, Control, Popup } from '@antv/l7'
import { GaodeMapV1 } from '@antv/l7-maps';
import citiesPosition from "./citiesPosition.json"
let scene = null
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
}



// 添加点图层
function initMarkers() {
  Promise.resolve(citiesPosition)
    .then(data => {
      const pointLayer = new PointLayer({
        name: "pointLayer_city",
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
    console.log(e);
    const { lng, lat } = e.lngLat
    const {name,value} = e.feature.properties
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
        '<span style="display:inline-block;width:20px;height:20px;background:' + colors[i] + '"> </span> '
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

onMounted(() => {
  initMap()
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