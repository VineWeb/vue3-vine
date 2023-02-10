import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({command, mode}: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env, 'env')
  return {
    base: env.APP_OUTPUT_DIR,
    plugins: [vue()],
    define: {
      'process.env': {},
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'comp': path.resolve(__dirname, 'src/components'),
        'style': path.resolve(__dirname, 'src/style'),
        'api': path.resolve(__dirname, 'src/api'),
        'utils': path.resolve(__dirname, 'src/utils'),
        'pages': path.resolve(__dirname, 'src/pages'),
        'filters': path.resolve(__dirname, "src/filters"),
        'routers': path.resolve(__dirname, 'src/routers'),
        'config': path.resolve(__dirname, 'src/config'),
        'store': path.resolve(__dirname, 'src/store'),
        'assets': path.resolve(__dirname, 'src/assets'),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
        sass: {
          charset: false,
        },
        less: {
          charset: false,
        },
        css: {
          charset: false,
        },
      },
      postcss: {
        plugins: [{ postcssPlugin: "charset-removal", AtRule: {charset: atRule=> {
          if (atRule.name === 'charset') {
              atRule.remove();
          }
        }}}],
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      cors: true,
      open: true,
      proxy: {
        '/api': {
            target: env.BASE_URL,   // 代理接口
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, '')
        },
        '/charts': {
          target: 'https://echarts.apache.org/examples',   // 代理接口
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/charts/, '')
        }
      }
    },
    build: {
      outDir: env.OUT_DIR,
      chunkSizeWarningLimit: 3000,
      minify: 'terser'
    }
  }
})

