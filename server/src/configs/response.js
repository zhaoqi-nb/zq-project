// == native modules ==
const path = require('path')

// == utils ==
const { walkFile, escapeHTML, formatErrorMessage } = require('../utils')

function renderJSON (json) {
  this.status = 200
  this.type = 'json'
  this.body = JSON.stringify(json)
}

function renderText (text) {
  this.status = 200
  this.type = 'text'
  this.body = text
}

function renderHTML (html) {
  this.status = 200
  this.type = 'html'
  this.body = html
}

function notFound (message) {
  this.status = 404
  this.type = 'html'
  this.body = message || 'Not Found'
}

function forbidden (message) {
  this.status = 403
  this.type = 'html'
  this.body = message || 'Forbidden'
}

function redirect (url, options) {
  const { viaJavascript = false, message } = options || {}

  this.status = 302
  this.type = 'html'
  this.set('Location', url)
  this.body = message || 'Moved Temporarily'

  if (viaJavascript) {
    this.status = 200
    this.body += '<script>location.replace(' +
      escapeHTML(JSON.stringify(url)) +
    ')</script>'
  }
}

function badRequest (message) {
  this.status = 400
  this.type = 'html'
  this.body = message || 'Bad Request'
}

function serverError (error) {
  this.status = 500
  this.type = 'html'
  this.body = 'Internal Error'
  if (error) {
    this.body += '<pre>' + escapeHTML(formatErrorMessage(error)) + '</pre>'
  }
}


module.exports = (app, { appPath }) => {

  const responseDirPath = path.join(appPath, 'responses')

  app.use( (ctx, next) => {
    ctx.notFound = ctx.response.notFound = notFound.bind(ctx.response)
    ctx.forbidden = ctx.response.forbidden = forbidden.bind(ctx.response)
    ctx.redirect = ctx.response.redirect = redirect.bind(ctx.response)
    ctx.badRequest = ctx.response.badRequest = badRequest.bind(ctx.response)
    ctx.serverError = ctx.response.serverError = serverError.bind(ctx.response)

    ctx.json = ctx.response.json = renderJSON.bind(ctx.response)
    ctx.html = ctx.response.html = renderHTML.bind(ctx.response)
    ctx.text = ctx.response.text = renderText.bind(ctx.response)

    return next()
  })

  walkFile(responseDirPath, filePath => {
    const { name } = path.parse(filePath)
    const response = require(filePath).default

    app.use( (ctx, next) => {
      const _response = response(ctx, app.config.response)
      ctx[name] = ctx.response[name] = (...arg) => {
        try { return _response.apply(null, arg) } catch (error) {
          return serverError.call(ctx.response, error)
        }
      }
      return next()
    })
  })

}