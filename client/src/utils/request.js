import axios from 'axios';
import _ from 'lodash';
import { message } from 'antd';

// import store from '../index';

/**
 * axios.interceptors.response.use()  请求返回拦截(根据code做相应的操作)
 * axios.interceptors.request.use()   请求发起拦截
 */

// 请求报错提示
const handleError = _.debounce(
  (error, msg) => {
    if (error) {
      const { response, request } = error;
      if (response) {
        const {
          status,
          data: { code, message: backendMsg },
        } = response;
        if (status >= 200 && status < 300) {
          const [type, by] = String(code);
          let errorMsg;
          if (by === '0') {
            errorMsg = backendMsg || msg || '请求失败！';
          } else {
            errorMsg = msg || backendMsg || '请求失败';
          }
          message[type === '2' ? 'warn' : 'error'](errorMsg);
        } else {
          message.error(`请求异常：${status}`);
        }
      } else if (request) {
        message.error('请求异常：无响应返回！');
      } else {
        message.error('请求发送异常！');
      }
    }
  },
  2000,
  {
    leading: true,
    trailing: false,
  },
);

// 封装统一转发请求
function doRequest(config, errorMsg) {
  console.log(config)
  return axios(config)
    .then((response) => {
      const {
        data: { body },
      } = response;
      return { response: body };
    })
    .catch((error) => {
      handleError(error, errorMsg);
      return { error };
    });
}

export function doGet(url, data, errorMsg, config = {}) {
  return doRequest(
    {
      url,
      method: 'get',
      params: data,
      ...config,
      headers: {
        ...config.headers,
        'x-requested-with': 'XMLHttpRequest',
      },
    },
    errorMsg,
  );
}

export function doPost(url, data, errorMsg, config = {}) {
  return doRequest(
    {
      url,
      method: 'post',
      data,
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
        'x-requested-with': 'XMLHttpRequest',
      },
    },
    errorMsg,
  );
}

// 上传api
export function doUpload(url, fileObj, fileName) {
  const formData = new FormData();
  formData.append('files', fileObj);
  formData.append('fileName', fileName);
  return axios
    .post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      const {
        data: { body },
      } = response;
      return body;
    })
    .catch((error) => {
      handleError(error);
    });
}

// 下载api
export function doDownload(url, method, data, filename, errorMsg) {
  const config = {
    url,
    method,
    responseType: 'blob',
    ...(method.toLowerCase() === 'post' ? { data } : { params: data }),
  };

  return axios(config)
    .then((response) => {
      const { data: resData, headers } = response;
      if (resData.type === 'application/json') {
        return resData.text().then((dataStr) => Promise.reject(JSON.parse(dataStr)));
      }
      if (resData.type === 'text/html') {
        const { redirect } = headers;
        const link = document.createElement('a');
        link.href = redirect;
        link.click();
        return undefined;
      }
      const fileSuffix = headers['content-disposition'].match(
        /filename=['"]?.+\.([^.]+?)['"]?$/,
      )[1];
      const objectUrl = window.URL.createObjectURL(new Blob([resData]));
      const link = document.createElement('a');
      link.href = objectUrl;
      link.setAttribute('download', `${filename}.${fileSuffix}`);
      link.click();
      window.URL.revokeObjectURL(objectUrl);
      return undefined;
    })
    .catch((error) => {
      handleError(error, errorMsg);
      return { error };
    });
}
