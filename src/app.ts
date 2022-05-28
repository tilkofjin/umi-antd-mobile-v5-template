import VConsole from 'vconsole';
import { jsBridge, setupWebViewJavascriptBridge } from  '@/utils/jsBridge'
import {
  authHeaderInterceptor,
  errorHandlerFc,
  responseInterceptors,
} from '@/utils/request';
import type { RequestConfig } from 'umi';

new VConsole({ theme: 'dark' });
setupWebViewJavascriptBridge(jsBridge);

// 请求封装
export const request: RequestConfig = {
  errorHandler: (error: any) => errorHandlerFc(error),
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseInterceptors],
};
