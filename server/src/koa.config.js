// const { createProxyMiddleware } = require('http-proxy-middleware')
// http://music.163.com  网易云api
const http = require('http')
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const views = require('koa-views')
const glob = require('glob')
const ejs = require('ejs')
const createAPI = require('./createAPI')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const c = { cyan: '\x1b[36m', red: '\x1b[31m', end: '\x1b[39m' }
const log = message => process.stdout.write(message + '\n')
const md5 = crypto.createHash('md5')
const timestamp = String(Date.now())
const sign = md5.update(`${timestamp}${credential[env]}`).digest('hex')
// todo:用来接收请求的参数
app.use(bodyParser());
app.createServer = () => {
  let server = http.createServer(app.callback())
  return app.serverReducers.reduce((server, reduce) => reduce(server), server)
}
app.serverReducers = []

app.listen = (...args) => {
  const address = '0.0.0.0'
  const base = `http://${address}:${args}`
  log(`To see your app, visit ${c.cyan}${base}${c.end}`)
  const server = app.server = app.createServer()
  return server.listen(...args)
}

const appPath = __dirname
app.use(views(path.join(__dirname, './utils/views'), {
  extension: 'ejs'
}))
const config = require('./configs/view').default
const getViewPath = () => '/'
const matches = {}
for (let viewDirPath of glob.sync(path.join(appPath, '/views', '/'))) {
  // 相对 appPath 的 文件路径
  viewDirPath = path.join('/', path.relative(appPath, viewDirPath), '/')
  // 对应的 url 路径

  const viewPath = getViewPath.call(config, viewDirPath)
  // 存到 map 中
  Object.assign(matches, { [viewPath]: viewDirPath })
}
// 返回ejs模版
const render = renderTemplate(appPath, matches, config)
app.use((ctx, next) => {
  ctx.render = ctx.response.render = render.bind(ctx, false)
  ctx.renderToString = ctx.response.renderToString = render.bind(ctx, true)
  return next()
})


function renderTemplate(appPath, matches, config) {
  const type = config.template || 'ejs'
  const layout = config.layout
  const baseData = config.data
  config = config[type] || []
  const ext = config.ext || '.ejs'
  const template = {
    // ejs 模版处理
    ejs(viewPath, data) {
      const filePath = viewPath + ext
      const tpl = fs.readFileSync(filePath, 'utf8')
      const fn = ejs.compile(tpl, Object.assign(
        { filename: filePath }, config))
      if (config.cache) cache[filePath] = fn
      return fn(data)
    },
  }

  const render = template[type]
  if (!render) { throw 'template not supported' }

  return function (isToString, viewPath, data, viewConfig = {}) {
    viewPath = path.join('/', viewPath)
    data = Object.assign(baseData, data)
    const matched = matchPath(matches, viewPath)

    if (!matched) throw new Error(`template ${viewPath} not found.`)

    const { viewDirRootPath, relativePath } = matched

    const viewDir = path.join(appPath, viewDirRootPath, relativePath)

    let html = render(viewDir, data)

    const layoutPath = viewConfig.layout === undefined ?
      layout : viewConfig.layout
    if (layoutPath) {
      const matched = matchPath(matches, path.join('/', layoutPath))

      if (!matched) throw new Error(`template ${layoutPath} not found.`)

      const { viewDirRootPath, relativePath } = matched
      const layoutDir = path.join(appPath, viewDirRootPath, relativePath)

      html = render(layoutDir, Object.assign({}, data, { body: html }))
    }
    if (isToString) return html
    Object.assign(this.response, { type: 'html', body: html })
  }
}

// 检查模版是否存在
function matchPath(matches, viewPath) {
  for (let viewRootPath in matches) {
    const viewDirRootPath = matches[viewRootPath]
    const relativePath = path.relative(viewRootPath, viewPath)
    if (relativePath.indexOf('..') !== 0) return {
      viewDirRootPath, relativePath
    }
  }
  return null
}
// api默认配置
app.config = {}
app.config.api = {
  timeout: 500,
  base: '',
  uri: '',
  method: 'get',
  queryEncode: true,
  contentType: 'application/x-www-form-urlencoded',
  // userAgent,
  parameters: {},
  // 请求发起前的处理时机 requestHandler
  // 请求返回后的处理时机 responseHandler
  responseEncoding: 'utf8',
  cache: false, // 缓存
}
app.config.env = process.env.NODE_ENV;
createAPI(app, { appPath, apiDir: '/apis' })

module.exports = app
