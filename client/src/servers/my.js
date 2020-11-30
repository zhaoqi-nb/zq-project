import { doGet, doPost } from '@/utils/request';

export async function fetchData(params) {
  return doGet('/api/my/fetch_data', params);
}

export async function editBuildPluginCrontab(params) {
  return doPost('/api/task/edit_build_plugin_crontab', params);
}
