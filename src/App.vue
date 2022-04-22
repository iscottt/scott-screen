<template>
  <ConfigProvider :locale="zhCN">
    <router-view />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
</script>

<style>
@font-face {
  font-family: BIN;
  src: url(./assets/fonts/din-bold.otf);
}
@font-face {
  font-family: TITLE;
  src: url(./assets/fonts/title.TTF);
}
</style>
