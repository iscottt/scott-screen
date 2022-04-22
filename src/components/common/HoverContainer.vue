<template>
  <div v-if="showTooltip">
    <Tooltip :placement="placement" :title="tooltipContent" trigger="hover">
      <div class="flex-center h-full cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]" :class="contentClass">
        <slot></slot>
      </div>
    </Tooltip>
  </div>
  <div v-else class="flex-center cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]" :class="contentClass">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue';
import { computed } from 'vue';

interface Props {
  /** tooltip显示文本 */
  tooltipContent?: string;
  /** tooltip的位置 */
  placement?: any;
  /** class类 */
  contentClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
});

const showTooltip = computed(() => Boolean(props.tooltipContent));
</script>
<style scoped></style>
