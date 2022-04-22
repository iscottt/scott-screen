<template>
  <Result :status="type" :title="type" :sub-title="exceptionTitle">
    <template #extra class="!h-50px">
      <a-button type="primary" @click="router.push('/dashboard')">回到首页</a-button>
    </template>
  </Result>
</template>

<script lang="ts" setup>
import { Result } from 'ant-design-vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

type ExceptionType = '403' | '404' | '500';

interface Props {
  /** 异常类型 403 404 500 */
  type: ExceptionType;
}
const props = defineProps<Props>();

const exceptionTitle = computed(() => {
  switch (props.type) {
    case '403':
      return '对不起，您暂无权限查看此页面。';
      break;
    case '404':
      return '对不起，该页面不存在。';
      break;
    case '500':
      return '服务器开小差了，请刷返回重试。';
      break;
  }
});
</script>
<style scoped></style>
