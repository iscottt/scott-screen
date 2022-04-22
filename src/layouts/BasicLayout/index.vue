<template>
  <Layout class="flex h-full overflow-hidden">
    <GlobalHeader v-model:collapsed="collapsed" />
    <Layout.Content>
      <GlobalContent />
    </Layout.Content>
    <GlobalFooter />
  </Layout>
</template>

<script setup lang="ts">
import { Layout } from 'ant-design-vue';
import { ref } from 'vue';
import { GlobalHeader, GlobalFooter, GlobalContent } from '../common';
const collapsed = ref<boolean>(false);
</script>
<style scoped></style>
