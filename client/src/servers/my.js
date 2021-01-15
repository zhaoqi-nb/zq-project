import { doGet } from '@/utils/request';

export async function fetchData(params) {
  return doGet('/api/onduty/get_on_duty_list', params);
}

export async function editBuildPluginCrontab(params) {
  return doGet('/api/onduty/get_on_duty_list', params);
}
