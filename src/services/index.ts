import { request } from 'umi';

export async function getToken(options?: Record<string, any>) {
  return request('/api/getToken', {
    method: 'GET',
    ...(options || {}),
  });
}
