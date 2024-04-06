import { defineConfig, createLogger } from 'vite'
import path from 'path'

import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import svgLoader from 'vite-svg-loader'

const logger = createLogger()
const loggerWarn = logger.warn

logger.warn = (msg, options) => {
  // 忽略空 CSS 文件的警告
  if (msg.includes('vite:css') && msg.includes(' display: contents')) return
  loggerWarn(msg, options)
}

// import { createStyleImportPlugin } from 'vite-plugin-style-import'
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx({
      babelPlugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties'],
      ],
    }),
    svgLoader(),
    // createStyleImportPlugin({
    //   libs: [
    //     {
    //       libraryName: 'element-ui',
    //       esModule: false,
    //       resolveStyle: (name: string) => {
    //         return `element-ui/lib/theme-chalk/${name}.css`
    //       },
    //     },
    //   ],
    // }),
  ],

  resolve: {
    alias: {
      '@': '/src',
      '~': '',
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(
          __dirname,
          'src/assets/style/variables.less'
        )}";`,
      },
    },
  },

  define: {
    'process.env': {
      NODE_ENV: process.env.NODE_ENV,
    },
  },

  customLogger: logger,

  server: {
    port: 8080, // 指定端口号
    host: '0.0.0.0',
    strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
    proxy: {
      // 开发者服务地址
      '/proxy': {
        target: 'http://proxy.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace('/proxy', ''),
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'element': ['element-ui']
        }
      }
    }
  }
})
