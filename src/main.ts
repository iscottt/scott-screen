import { createApp } from 'vue';
import { setupAntd, setupAssets } from '@/core';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from '@/store';

async function setupApp() {
  // 引入静态资源
  setupAssets();
  const app = createApp(App);
  // 挂载pinia状态
  setupStore(app);

  // 引入Ant Design Vue
  setupAntd(app);

  // 挂载路由
  await setupRouter(app);

  // 路由准备就绪后挂载 App
  app.mount('#app');
}
setupApp();
