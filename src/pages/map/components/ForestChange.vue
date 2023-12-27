<template>
  <div id="forest-change">

  </div>
</template>

<script setup>
import {onMounted} from 'vue'
import { Scene, PolygonLayer, LayerPopup } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';

import worldJSON from '../assets/world.json'
function initMap(){
  const scene = new Scene({
  id: 'forest-change',
  map: new GaodeMap({
    style: 'light',
    center: [2.58384,37.072686],
    zoom: 1,
    maxZoom: 5,
    token: '1cb9598ad3fd4bd4ae11ac5e960dcc77',
  })
});

scene.on('loaded', async () => {
  const colors =  ['#d73027', '#f46d43','#fdae61', '#fee08b','#fee08b', '#ffffff','#ffffff', '#afe1af', '#93c72e', '#097969', '#355e3b']
  const domain = [-2000000, -400000, -200000, -10000, -1,0,1, 10000, 200000, 400000, 2000000]
  const layer1 = new PolygonLayer({})
    .source({
      "type": "FeatureCollection",
      "features": worldJSON.features
    })
    .color("forest_change",
      colors)
    .shape('fill')
    .scale('forest_change', {
      type: 'threshold',
      domain: domain,
    })
    .style({
      opacity: 0.6
    })
  const layerPopup1 = new LayerPopup({
    trigger:'click',
    items: [
      {
        layer: layer1,
        fields: [
          {
            field: 'NAME_CHN',
            formatField: () => '国家',
          },
          {
            field: 'forest_change',
            formatField: () => '森林面积变化',
            formatValue: (val) => {
              return val + '公顷'

            }
          },
        ],
      },
    ],
  });
  scene.addPopup(layerPopup1);
  scene.addLayer(layer1);
});
}

onMounted(()=>{
  initMap()
})

</script>

<style lang="scss" scoped>
#forest-change {
  height: 100%;

  position: relative;
  overflow: hidden;
}
</style>