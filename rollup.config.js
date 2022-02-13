// rollup 天然支持 esm
// rollup 常用与库的打包
import { main, module } from './package.json'

import typescript from '@rollup/plugin-typescript';

export default {
  // 入口
  input: './src/index.ts',
  // 出口
  output: [
    /**
     * 1. cjs -> commonjs
     * 2. esm -> esModule
     */
    {
      // 打包成什么模式下的
      format: 'cjs',
      file: main, // lib/guide-mini-vue.cjs.js
    },
    {
      format: 'es',
      file: module, // lib/guide-mini-vue.esm.js
    },
  ],
  // 项目使用ts编写的 rollup不理解ts，需要使用编译
  plugins: [typescript()],
};
