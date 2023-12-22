<template>
  <div id="mask-map">

  </div>
</template>

<script setup>
// @ts-ignore
import { Scene, RasterLayer, PolygonLayer } from '@antv/l7';
// @ts-ignore
import { GaodeMapV1 } from '@antv/l7-maps';

import * as GeoTIFF from 'geotiff';

async function getTiffData() {
  const response = await fetch(
    'http://127.0.0.1:3007/download/mask?year=2020',
    // 'https://gw.alipayobjects.com/zos/antvdemo/assets/2019_clip/ndvi_201905.tiff',
  );
  const arrayBuffer = await response.arrayBuffer();
  console.log(arrayBuffer);
  const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
;
  const image = await tiff.getImage();
  const width = image.getWidth();
  const height = image.getHeight();
  const values = await image.readRasters();
  return {
    data: values[0],
    width,
    height,
    min: 0,
    max: 8000,
  };
}


const scene = new Scene({
  id: 'mask-map',

  map: new GaodeMapV1({
    center: [99.288144, 38.239692],
    pitch: 0,
    zoom: 3.5,
    minZoom: 4.5,
    token: '1cb9598ad3fd4bd4ae11ac5e960dcc77',
  })
});
scene.addImage(
  '00',
  'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
);

fetch(
  'https://gw.alipayobjects.com/os/basement_prod/d2e0e930-fd44-4fca-8872-c1037b0fee7b.json',
)
  .then((res) => res.json())
  .then(async (maskData) => {
    const tiffdata = await getTiffData();
    const polygonLayer = new PolygonLayer({
      visible: false
    }).source(maskData).shape('fill').color('#f00').style({ opacity: 0.5 });
    const layer = new RasterLayer({
      maskLayers: [polygonLayer]
    });
    const mindata = -0;
    const maxdata = 8000;
    layer
      .source(tiffdata.data, {
        parser: {
          type: 'raster',
          width: tiffdata.width,
          height: tiffdata.height,
          extent: [
            73.482190241,
            5.82501784112,
            135.106618732,
            57.6300459963,
          ],
        },
      })
      .style({
        opacity: 0.8,
        domain: [mindata, maxdata],
        clampLow: true,
        rampColors: {
          colors: [
            'rgb(166,97,26)',
            'rgb(223,194,125)',
            'rgb(245,245,245)',
            'rgb(128,205,193)',
            'rgb(1,133,113)',
          ],
          positions: [0, 0.25, 0.5, 0.75, 1.0],
        },
      });
    scene.addLayer(layer);
    scene.addLayer(polygonLayer);
  });

</script>

<style lang="scss" scoped></style>