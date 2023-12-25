import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import Icons from 'unplugin-icons/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue({}),
    svgLoader(),
    Icons({
      autoInstall: true,
      compiler: 'vue3'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // build: {
  //   rollupOptions: {
  //     // https://rollupjs.org/guide/en/#outputmanualchunks
  //     output: {
  //       manualChunks: {
  //         dashboard: [
  //           './src/pages/Dashboard/Links/Links',
  //           './src/pages/Dashboard/Appearance',
  //           './src/pages/Dashboard/Dashboard'
  //         ]
  //       }
  //     }
  //   }
  // }
})
