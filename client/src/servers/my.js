import { doGet, doPost } from '@/utils/request';

export async function fetchData(params) {
  return doGet('/api/onduty/get_on_duty_list', params);
}

export async function editBuildPluginCrontab(params) {
  return doPost('/api/onduty/get_on_duty_list', params);
}
