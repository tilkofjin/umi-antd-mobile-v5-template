import { defineConfig } from 'umi';
import routes from './routes';

/**
 * UMI 配置
 * 更多相关配置查询 https://umijs.org/zh-CN/docs/config
 */
export default defineConfig({
  title: 'antd-mobile-template',
  dynamicImport: {
    loading: '@/components/Loading',
  },
  routes,
  nodeModulesTransform: {
    type: 'none',
  },
  // 只能修改 antd 的全局样式，仅作示例，mobile 的需另行处理
  theme: {
    '@primary-color': 'red',
  },
  //使用高清适配，这里默认关闭，若要开启，为了保持样式统一需要给 antd-mobile 取个别名
  // antdMobile: {
  //   hd: true,
  // },
  // alias: {
  //   'antd-mobile': 'antd-mobile/2x',
  // },
  proxy: {
    '/api/': {
      target: 'http://www.xxx.com',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  mfsu: {},
  esbuild: {},
  webpack5: {},
  fastRefresh: {},
  extraBabelPlugins: [],
  extraPostCSSPlugins: [
    require('postcss-px-to-viewport')({
      unitToConvert: 'px', //需要转换的单位，默认为"px"
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 1334, //视窗的高度，根据375设备的宽度来指定，一般指定667，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      propList: ['*'], // 能转化为vw的属性列表
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      fontViewportUnit: 'vw', //字体使用的视口单位
      selectorBlackList: ['.ignore-', '.hairlines', 'am-', 'px-'], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      replace: true, //是否直接更换属性值，而不添加备用属性
      exclude: [/\/Stores\/.*.less/, /global.css/, /node_modules/], //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      landscape: false, //是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw', //横屏时使用的单位
      landscapeWidth: 1134, //横屏时使用的视口宽度
    }),
  ],
  publicPath: '/lvman/',
  history: {
    type: 'hash',
  },
  hash: true,
  metas: [
    {
      name: 'antd-mobile-template',
      content: '基于umi@3.x + antd-mobile v5 快速构建h5及app应用',
    },
  ],
  targets: {
    chrome: 49,
    ios: 10,
  },
});
