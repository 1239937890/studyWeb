import { request } from '@/utils/request';
function liveList(params) {
  return request('POST', '/live_list', params);
}
export { liveList };
