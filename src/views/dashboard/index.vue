<template>
  <div class="map">
    <div id="GDMap"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAmap } from '@/hooks';
const GDMap = ref<any>(null);
const key = '2b45151b7ecb88ab4a2e87a12ec1d67c';
const version = '1.4.19';
const loading = ref(true);
onMounted(() => {
  useAmap(key, [], version)
    .then((AMap) => {
      GDMap.value = new AMap.Map('GDMap', {
        pitch: 0,
        mapStyle: 'amap://styles/darkblue',
        center: [121.435159, 31.256971],
        zoom: 14.89,
        minZoom: 10,
      });
      GDMap.value.setMapStyle('amap://styles/darkblue');
      GDMap.value.on('complete', () => {
        loading.value = false;
      });
    })
    .catch(() => {
      loading.value = false;
      console.log('地图加载失败！');
    });
});
</script>

<style scoped>
#GDMap {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
