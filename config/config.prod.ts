import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      APP_ENV: 'prod',
    },
  },
  proxy: {
    '/api/': {
      target: 'http://www.baidu.com',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
});
