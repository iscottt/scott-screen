import type { ConfigEnv, PluginOption } from 'vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import vue from './vue';
import windicss from './windicss';
import vueJsx from '@vitejs/plugin-vue-jsx';

/**
 *	vite插件
 * @param configEnv - 环境
 * @param srcPath - src路径
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(
  _configEnv: ConfigEnv,
  _srcPath: string,
  _viteEnv: ImportMetaEnv
): (PluginOption | PluginOption[])[] {
  const plugins = [vue, windicss, DefineOptions(), vueJsx()];
  return plugins;
}
