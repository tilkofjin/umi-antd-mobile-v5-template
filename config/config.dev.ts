import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      APP_ENV: 'dev',
    },
  },
  proxy: {
    '/api/': {
      target: 'http://www.google.com',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
});
