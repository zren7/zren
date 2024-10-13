import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    AutoImport({
      // 自动引入，不需要手动去写import
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/types/auto-imports.d.ts',
      // element需要通过resolvers引用
      resolvers: [ElementPlusResolver()],
      // 会自动生成eslint规则，防止eslint报错
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      // 按需引入，避免没使用的组件也打包
      // { importStyle: 'sass' }
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/auto-components.d.ts'
    })
  ],
  css: {
    preprocessorOptions: {
      //define global scss variable
      scss: {
        silenceDeprecations: ['legacy-js-api'],
        additionalData: '@import "./src/styles/variables.scss";',
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  }
})
