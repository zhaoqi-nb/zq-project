const clientPublicUrl = {
  production: 'http://s1.ljcdn.com/ke-ones', // 客户端生产环境cdn地址
  development: 'http://0.0.0.0:3080', // 客户端开发环境地址
  testing: '' // 测试环境cdn资源
};

const nodePort = {
  testing: {
    test: 9242,
    test2: 9254,
    test3: 9282,
    test4: 9397,
    // test5: ,
  },
  development: 3034,
};
const serverApiUrl = {
  production: 'http://api.ones.ke.com/',
  testing: {
    dev: 'http://music.163.com',
    test: 'http://test-api.ones.ke.com/',
  },
  mock: 'http://at.ke.com/mock/http-ke-ones/forfe/test1---rec-no'
}
const DEV_SERVER_ENV = process.env.DEV_SERVER_ENV;
const isDevServerEnvTesting = DEV_SERVER_ENV && DEV_SERVER_ENV.indexOf('test') === 0;
const NODE_ENV = process.env.NODE_ENV;
const RELEASE_ENV = process.env.RELEASE_ENV;

const isEnvTesting = NODE_ENV === 'testing' || (RELEASE_ENV && RELEASE_ENV.indexOf('test') === 0);

const CLIENT_PUBLIC_URL = Object.assign({}, clientPublicUrl, {
  testing: isEnvTesting ? clientPublicUrl.testing[RELEASE_ENV] : undefined,
});

const NODE_PORT = {
  development: nodePort.development,
  testing: isEnvTesting ? nodePort.testing[RELEASE_ENV] : undefined,
};

module.exports = {
  NODE_PORT,
  CLIENT_PUBLIC_URL
};
