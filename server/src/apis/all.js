// import URI_PREFIX from './_uri_prefix'
import signRequest from '../api-signature';
import { SERVER_API_URL } from '../env';
const URI_PREFIX = '';

export default api => {
  api.config = {
    // 接口超时时间
    timeout: 10000,

    // 默认的返回值简单约定， {code: , data:, msg:} 的形式返回
    // 如果是这种返回形式的话，那么通过下面参数，做接口检查
    codeKey: 'code',
    dataKey: 'data',
    messageKey: 'msg',
    successCode: 0,

    requestHandler(req, ctx) {
      signRequest(req, ctx);
      return req;
    },

    // 如果不是上面的形式
    responseHandler(res, ctx) {
      // res 是 node-fetch 的返回值
      if (res.statusCode === 200) {
        const json = JSON.parse(res.body);
        return json;
      } else {
        return { code: 50000, message: res.statusText };
      }
    },

    // 接口的协议，域名，端口
    base: SERVER_API_URL.production,

    // 接口请求数据格式
    // 一下可选
    // multipart/form-data
    // application/json
    // application/x-www-form-urlencoded
    contentType: 'application/json',

    // query 参数的值是否需要 encode
    // queryEncode: true
  };

  // 定义接口
  api('get_user_ui_auth', {
    uri: '/auth/get_user_ui_auth',
    method: 'get',
  });
  api('get_user_init_org', {
    uri: URI_PREFIX + '/auth/get_user_init_org',
    method: 'get',
  });
  api('get_user_init_level', {
    uri: URI_PREFIX + '/auth/get_user_init_level',
    method: 'get',
  });
  api('check_has_level_auth', {
    uri: URI_PREFIX + '/auth/check_has_level_auth',
    method: 'get',
  });
};

export const development = api => {
  api.config = {
    base: SERVER_API_URL.development,
  };
};

// 测试环境配置
export const testing = api => {
  api.config = {
    base: SERVER_API_URL.testing,
  };
};
