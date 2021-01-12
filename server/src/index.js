if (require('path').basename(__dirname) === 'src') {
  require('babel-core/register')({ presets: ['env'] });
}
// import app from './config/koa.config'
const app = require('./koa.config')
const { NODE_PORT } = require('./env')
const env = process.env.NODE_ENV;
const port = NODE_PORT[env] || 80

app.use(async (ctx, next) => {
  ctx.body = '张三';
  // console.log(ctx.url, ctx.request, ctx)
  console.log(222)
  ctx.response.render('index', {
    userInfo: {
      name: '张三',
      userCode: '123456'
    },
  });
  await next();/*继续向下匹配路由*/
})

app.listen(port)
