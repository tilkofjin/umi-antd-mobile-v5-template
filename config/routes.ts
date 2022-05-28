/**
 * 路由配置
 * 更多路由请查询 https://umijs.org/zh-CN/docs/routing
 */
 export default [
  { exact: true, path: '/', redirect: '/home', name: '首页' },
  {
    path: '/',
    component: '@/layouts/index', // 采用 umi 约定的全局路由，因为umi不能针对不同的路由配置不同的 layout，所以需要在全局的layout中特殊处理。
    routes: [
      { path: '/home', name: '首页', component: '@/pages/home' },
      { path: '/detail', name: '详情页', component: '@/pages/details/index' },
      { path: '/*', component: '@/pages/404' },
      { path: '/**/*', redirect: '/404' },
    ],
  },
];