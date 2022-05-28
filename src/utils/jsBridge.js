/**
 * @description: 注册 jsBridge
 * @param {*} callback
 * @return {*}
 */
export const setupWebViewJavascriptBridge = (callback) => {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      () => {
        callback(window.WebViewJavascriptBridge);
      },
      false,
    );
  }

  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }

  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
};

/**
 * @description: 初始化 jsBridge
 * @param {*} bridge
 * @return {*}
 */
export const jsBridge = (bridge) => {
  let counter = 0;
  if (!bridge) {
    if (counter <= 5) {
      setTimeout(() => {
        jsBridge(window.WebViewJavascriptBridge);
        counter++;
      }, 50);
    } else {
      console.log('尝试次数超限，无法获取到桥');
    }
  } else {
    if (window.WebViewJavascriptBridge.init) {
      try {
        window.WebViewJavascriptBridge.init();
      } catch (error) {
        console.log('WebViewJavascriptBridge.init报错', error);
      }
    }
  }
};


/**
 * @description: 调用 jsBridge
 * @param {*} key
 * @param {*} params
 * @param {*} callback
 * @return {*}
 */
export const jsBridgeCallHander = (key, params, callback) => {
  if (window.WebViewJavascriptBridge) {
    window.WebViewJavascriptBridge.callHandler(key, params, callback);
  }
};
