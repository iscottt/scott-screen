import { RouteRecordRaw } from 'vue-router';

/** 固定的路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: '/',
    meta: {
      title: 'Root',
    },
    redirect: '/dashboard',
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    meta: {
      title: 'Dashboard',
    },
    component: () => import('@/views/dashboard/index.vue'),
  },
  // 匹配无效路径的路由
  {
    name: 'not-found-page',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/system-view/not-found-page/index.vue'),
    meta: {
      title: '未找到',
    },
  },
];
