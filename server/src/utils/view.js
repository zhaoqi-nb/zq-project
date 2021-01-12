// == native modules ==
const path = require('path')
const fs = require('fs')
// == third-party ==
const glob = require('glob')
const ejs = require('ejs')

// == utils ==
const { deepMerge } = require('../utils')

const defaultViewConfig = {
  template: 'ejs',
  cache: true,
  ejs: {
    delimiter: '%',
    ext: '.ejs'
  },
  pug: {
    ext: '.pug'
  }
}

module.exports = (app, { appPath, viewDir, getViewPath }) => {

  const config = deepMerge.copy(defaultViewConfig, app.config.view)

  // 获取待匹配的路由表对应关系
  const matches = {}
  for (let viewDirPath of glob.sync(path.join(appPath, viewDir, '/'))) {
    // 相对 appPath 的 文件路径
    viewDirPath = path.join('/', path.relative(appPath, viewDirPath), '/')
    // 对应的 url 路径
    const viewPath = getViewPath.call(config, viewDirPath)
    // 存到 map 中
    Object.assign(matches, { [viewPath]: viewDirPath })
  }

  const render = renderTemplate(appPath, matches, config)

  app.use((ctx, next) => {
    ctx.render = ctx.response.render = render.bind(ctx, false)
    ctx.renderToString = ctx.response.renderToString = render.bind(ctx, true)
    return next()
  })
}

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

const cache = {}
function renderTemplate(appPath, matches, config) {

  const type = config.template || 'ejs'
  const layout = config.layout
  const baseData = config.data

  config = config[type] || []

  const ext = config.ext || '.html'

  const template = {

    // ejs 模版处理
    ejs(viewPath, data) {
      const filePath = viewPath + ext

      if (config.cache && cache.hasOwnProperty(filePath)) {
        return cache[filePath](data)
      }

      const tpl = fs.readFileSync(filePath, 'utf8')
      const fn = ejs.compile(tpl, Object.assign(
        { filename: filePath }, config))

      if (config.cache) cache[filePath] = fn
      return fn(data)
    },

    // pug 模版处理
    pug(viewPath, data) {
      const filePath = viewPath + ext

      if (config.cache && cache.hasOwnProperty(filePath)) {
        return cache[filePath](data)
      }

      const tpl = fs.readFileSync(filePath, 'utf8')
      const fn = pug.compile(tpl, Object.assign(
        { filename: filePath }, config))

      if (config.cache) cache[filePath] = fn
      return fn(data)
    },

  }

  const render = template[type]
  if (!render) { throw 'template not supported' }

  return function (isToString, viewPath, data, viewConfig = {}) {
    viewPath = path.join('/', viewPath)
    data = deepMerge.copy(this.viewData, baseData, data)

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
