import { defineConfig, loadEnv } from 'vite';
import { resolvePath, viteDefine } from './build';
import { setupVitePlugins } from './build/plugins';

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, `.env.${configEnv.mode}`) as ImportMetaEnv;
  const vitePath = resolvePath('./', import.meta.url);

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': vitePath.root,
        '@': vitePath.src,
      },
    },
    define: viteDefine,
    plugins: setupVitePlugins(configEnv, vitePath.src, viteEnv),
    build: {
      brotliSize: false,
    },
    configureWebpack: {
      externals: {
        AMap: 'AMap', // 高德地图配置
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {},
        },
      },
    },
  };
});
