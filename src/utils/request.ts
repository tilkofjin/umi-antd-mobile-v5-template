import { message } from 'antd';
import type { RequestOptionsInit } from 'umi-request';
import { downloadFile, sendLogout } from '.';

type ResDataType = {
  data: any;
  code: number | string;
  success: boolean;
  message: string;
  time: string;
};

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户信息已失效，请重启登录',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '您请求的资源不存在，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * @description: 响应拦截器
 * @param {Response} response
 * @param {RequestOptionsInit} options
 * @return {*}
 */
export const responseInterceptors = async (
  response: Response,
  options: RequestOptionsInit,
) => {
  const { status } = response;
  const { responseType } = options;
  if (status === 200) {
    if (responseType === 'blob') {
      const disposition = response.headers.get('content-disposition');
      const splitDis = disposition && disposition.split(';');
      let filename: string = '';
      if (splitDis && splitDis[0] === 'attachment') {
        const fileNameDefault = splitDis[1].split('filename=');
        const defaultName = fileNameDefault[0]
          ? fileNameDefault[0].split('"')[1]
          : fileNameDefault[1];
        const fileNameUnicode = disposition.split('filename*=')[1];
        filename = fileNameUnicode
          ? decodeURIComponent(fileNameUnicode.split("''")[1])
          : defaultName;
      }
      downloadFile(response, filename);
      return response;
    }
    const res = await response.clone().json();
    const { success } = res as unknown as ResDataType;
    if (!success) {
      message.error(`错误信息： ${res.message || res.msg}`);
    }
    return res;
  }
  return response;
};

/**
 * @description: 请求拦截器
 * @param {string} url
 * @param {RequestOptionsInit} options
 * @return {*}
 */
export const authHeaderInterceptor = (
  url: string,
  options: RequestOptionsInit,
) => {
  const token = localStorage.getItem('token') as string;
  const authHeader: Record<string, any> = { ...options.headers };
  if (token) {
    authHeader.token = token;
  }
  return {
    url,
    options: {
      ...options,
      interceptors: true,
      headers: { ...authHeader },
    },
  };
};

/**
 * @description: 请求错误处理
 * @param {any} error
 * @return {*}
 */
export const errorHandlerFc = (error: any): Response => {
  const { response } = error;
  const codeMessageList = Object.keys(codeMessage);
  if (response || response.status) {
    const { status } = response;
    const errorText = codeMessage[response.status] || response.statusText;
    if (status === 401) {
      localStorage.clear();
      sendLogout();
    }
    if (codeMessageList.includes(`${response.status}`)) {
      message.error(`${errorText}`);
    }
    return response;
  } else {
    message.error(`${error.errorMessage || '抱歉，连接服务器失败'} `);
    throw error;
  }
};
