<template>
  <Layout.Header class="!bg-[#FFFFFF] !pr-10px !pl-10px">
    <div class="w-full h-64px flex items-center justify-start bg-[#ffffff]">
      <div v-if="isMobile" class="leading-70px text-30px font-bin align-center overflow-hidden">Scott Admin</div>
      <div v-if="!isMobile" class="cursor-pointer" @click="emit('update:collapsed', !collapsed)">
        <component class="text-20px pl-20px pr-20px" :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
      </div>
      <div class="p-0 flex-1 h-full flex items-center justify-start pl-21px">
        <Breadcrumb>
          <template v-for="routeItem in route.matched" :key="routeItem.name">
            <Breadcrumb.Item>
              <router-link :to="{ name: routeItem.name }">
                {{ routeItem.meta.title }}
              </router-link>
            </Breadcrumb.Item>
          </template>
        </Breadcrumb>
      </div>
      <div class="flex items-center justify-end">
        <!-- <div class="item">
        <img src="@/assets/images/layout/notice.png" alt="" />
      </div>
      <div class="item">
        <img src="@/assets/images/layout/setting.png" alt="" />
      </div> -->
        <div class="w-40px h-40px flex-center cursor-pointer" @click="logout">
          <Tooltip>
            <template #title>退出登录</template>
            <img class="w-20px h-20px" src="@/assets/images/layout/logout.png" alt="logout" />
          </Tooltip>
        </div>
        <div
          v-if="isMobile"
          class="w-40px h-40px flex-center cursor-pointer"
          @click="emit('update:collapsed', !collapsed)"
        >
          <img class="w-20px h-20px" src="@/assets/images/layout/menu.png" alt="menu" />
        </div>
      </div>
    </div>
  </Layout.Header>
</template>

<script lang="ts" setup>
import { QuestionCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { message, Modal, Layout } from 'ant-design-vue';
import { computed, createVNode } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/store';
import { EnumDeviceType } from '@/enum';
import { Breadcrumb, Tooltip } from 'ant-design-vue';

// 定义组件props
interface Props {
  collapsed: Boolean;
}
defineProps<Props>();
const emit = defineEmits(['update:collapsed']);
const app = useAppStore();
const router = useRouter();
const route = useRoute();
// 获取设备终端判断
const isMobile = computed(() => {
  return app.device === EnumDeviceType.mobile;
});

// 退出登录
const logout = () => {
  Modal.confirm({
    title: '您确定要退出登录吗？',
    icon: createVNode(QuestionCircleOutlined),
    onOk: () => {
      message.success('成功退出登录', 1);
      setTimeout(() => {
        router
          .replace({
            name: 'login',
          })
          .finally(() => location.reload());
      }, 1000);
    },
  });
};
</script>
