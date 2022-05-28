import { Toast } from 'antd-mobile';
import { parse } from 'querystring';
import { jsBridgeCallHander } from './jsBridge';

/**
 * @description: 判断浏览器内核、手机系统等，使用 browser.version.ios
 * @return {*}
 */
export const getBrower = () => {
  const u = navigator.userAgent;
  const ua = navigator.userAgent.toLocaleLowerCase();
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // 安卓终端
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iphone或QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否为iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应用程序，没有头部与底部
    QQbrw: u.indexOf('MQQBrowser') > -1, // QQ浏览器
    weiXin: u.indexOf('MicroMessenger') > -1, // 微信
    QQ: String(ua.match(/QQ/i)) === 'qq', // QQ
    weiBo: String(ua.match(/WeiBo/i)) === 'weibo', // 微博
    ucLowEnd: u.indexOf('UCWEB7.') > -1, //
    ucSpecial: u.indexOf('rv:1.2.3.4') > -1,
    webview:
      !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) &&
      u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    Symbian: u.indexOf('Symbian') > -1,
    ucSB: u.indexOf('Firofox/1.') > -1,
  };
};

/**
 * @description: 下载文件
 * @param {Response} response
 * @param {string} filename
 * @return {*}
 */
export const downloadFile = (response: Response, filename: string): void => {
  if (response) {
    response
      .clone()
      .blob()
      .then((blob) => {
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .then(() => {
        Toast.show({
          content: `下载${filename}文件成功！`,
        });
      });
  }
};

/**
 * @description: 重新登录app
 * @return {*}
 */
export const sendLogout = () => {
  jsBridgeCallHander('_app_login', {}, (res: any) => {
    console.log('🚀 ~ file: index.tsx ~ line 407 ~ _app_login ~ res', res);
  });
};

/**
 * @description: 获取 app 端路由中带的参数
 * @return {*}
 */
export const getWindowLocationParams = () => {
  const { hostname, pathname, search, origin } = window.location as any;
  return {
    search: parse(search),
    hostname,
    pathname,
    origin,
  };
};


/**
 * @description: 查找树下是否有某个 codeName
 * @param {tree, codeName}
 * @return {boolean}
 */
 export const findChildrenCode = (tree: any[], codeName: string | number) => {
  if (!tree.length || !codeName)
    throw Error('要查找的tree 未找到子节点 或 codeName 未填写！');
  for (const node of tree) {
    if (node.path === codeName) return node;
    if (node.routes && node.routes.length) {
      const find: any = findChildrenCode(node.routes, codeName);
      if (find) {
        return find;
      }
    }
  }
};