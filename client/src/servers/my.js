import { doGet } from '@/utils/request';

export async function fetchData(params) {
  return doGet('/api/onduty/get_next_date', params);
}

export async function editBuildPluginCrontab(params) {
  return doGet('/api/onduty/update_on_duty_status', params);
}
