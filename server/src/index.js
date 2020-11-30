// http://music.163.com  网易云api
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()
const serverApiUrl = {
  production: 'http://api.ones.ke.com/',
  testing: {
    test: 'http://test-api.ones.ke.com/',
    test2: 'http://test2-api.ones.ke.com/',
    test3: 'http://test3-api.ones.ke.com/',
    test4: 'http://test4-api.ones.ke.com/',
    // test5: '',
  },
}
const DEV_SERVER_ENV = process.env.DEV_SERVER_ENV;
const isDevServerEnvTesting = DEV_SERVER_ENV && DEV_SERVER_ENV.indexOf('test') === 0;
app.use('/api', createProxyMiddleware({
  target: isDevServerEnvTesting ? serverApiUrl.testing[DEV_SERVER_ENV] : serverApiUrl.testing.test,
  changeOrigin: true,
  pathRewrite: {
    "^/api": ""
  }
}))

app.listen(3080, () => {
  console.log('服务器启动成功')
})
