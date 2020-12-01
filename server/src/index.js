require('babel-polyfill');
// http://music.163.com  网易云api

const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()
const serverApiUrl = {
  production: 'http://api.ones.ke.com/',
  testing: {
    dev: 'http://music.163.com',
    test: 'http://test-api.ones.ke.com/',
    test2: 'http://test2-api.ones.ke.com/',
    test3: 'http://test3-api.ones.ke.com/',
    test4: 'http://test4-api.ones.ke.com/',
    // test5: '',
  },
}
const DEV_SERVER_ENV = process.env.DEV_SERVER_ENV;
const isDevServerEnvTesting = DEV_SERVER_ENV && DEV_SERVER_ENV.indexOf('test') === 0;

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');


// app.get('/', function (req, res) {
//   res.render('index.ejs', {
//     ENV: 1111, userInfo: {
//       name: '赵琪'
//     }
//   });
// });

app.use('/api', createProxyMiddleware({
  target: isDevServerEnvTesting ? serverApiUrl.testing[DEV_SERVER_ENV] : serverApiUrl.testing.test,
  changeOrigin: true,
  pathRewrite: {
    "^/api": ""
  },
  // port
}))

app.listen(3081, () => {
  console.log('服务器启动成功')
})
