// const request = require('request')
// const glob = require('glob')
// const path = require('path')

// function createAPI(config) {
//   let {
//     // 请求
//     displayName = 'anonymous',
//     filename = 'anonymous',
//     timeout,
//     method,
//     base,
//     uri,
//     queryEncode, // query 参数是不是要 url encode
//     contentType,
//     userAgent,
//     parameters,
//     // requestHandler, // 请求发起前的处理时机
//     // responseHandler, // 请求返回后的处理时机
//     responseEncoding, // 返回数据格式，如果要返回buffer 写 null
//     // cache, // 缓存
//     host, // 请求host
//     proxy, // 代理
//   } = config

//   method = method.toUpperCase()

//   return (data = {}, options = {}) => {
//     let { query = {}, headers = {}, uriReplacer = {}, ctx } = options

//     ctx = ctx || __unstable__getContext()

//     // 根据 parameters 做接口数据的类型检查
//     objectForEach(parameters, (checker, name) => {
//       const value = data[name]
//       assert(checker(value) !== true,
//         `API parameter check error\n` +
//         `    displayName: ${config.displayName}\n` +
//         `    file: ${config.filename}\n` +
//         `    parameter: ${name}\n` +
//         `    value: ${JSON.stringify(value)}\n` +
//         `    Accept a ${checker.type}, but get a ${getType(value)}\n`
//       )
//     })

//     // requestOptions 是发起请求的数据对象
//     const requestOptions = {
//       uri,     // 请求地址
//       method,  // 请求的方法
//       timeout, // 请求超时时间
//       proxy,   // 设置请求代理
//       displayName,
//       encoding: responseEncoding,
//       // 处理 请求头
//       headers: Object.assign({
//         'Content-Type': contentType,
//         'User-Agent': userAgent,
//         'Host': host,
//       }, headers)
//     }

//     // 处理请求数据
//     if (~['GET', 'HEAD', 'OPTIONS'].indexOf(method)) {
//       query = deepMerge.copy(query, data)
//       console.log(contentType, 'query', query)

//     } else {
//       // 处理 body 数据
//       console.log(contentType, 'headers')
//       switch (contentType) {
//         case 'multipart/form-data':
//           requestOptions.formData = objectForEach(data, value => {
//             if (getType(value) !== 'stream') return value
//             const options = {
//               filename: value.filename,
//               contentType: value.mimeType
//             }
//             return { value, options }
//           })
//           break
//         case 'application/json':
//           requestOptions.body = JSON.stringify(data)
//           break
//         case 'application/x-www-form-urlencoded':
//           requestOptions.form = data
//           break
//         default:
//           requestOptions.body = data
//       }
//     }

//     // 拼装 uri
//     requestOptions.uri = appendSearch(
//       // 通过 uriReplacer 填补 uri 中 {maker} 的数据
//       url.resolve(base,
//         uri.replace(/\{\s*([^\}]+)?\s*\}/g, (_, mark) => uriReplacer[mark])),

//       // 处理 search
//       qs.stringify(query, {
//         sort: (a, b) => a.localeCompare(b),
//         encode: queryEncode
//       })
//     )

//     // 添加 requestHandler 时机Promise.resolve(requestHandler.call(config, requestOptions, ctx))
//     return (requestOptions => {

//       return doRequest(requestOptions)


//       // 请求发起 人间大炮一级准备
//       function doRequest(requestOptions) {

//         const catchError = error => {
//           error = error || new Error()
//           error.message += '\n' +
//             `    uri: ${requestOptions.uri}\n` +
//             `    displayName: ${config.displayName}\n` +
//             `    file: ${config.filename}\n`

//           process.emit('log.error', error)
//           return Promise.reject(error)
//         }

//         if (ctx) ctx.request.sequence++

//         requestOptions.startTime = Date.now()
//         return requestAsync(requestOptions)
//           .catch(catchError)
//           .then(response => {
//             requestOptions.endTime = Date.now()
//             // 记录日志
//             process.emit('log.api', { ctx, requestOptions, response })

//             // 添加 responseHandler 时机Promise.resolve(responseHandler.call(config, response, ctx))
//             return Promise.resolve()
//               .catch(catchError)
//               .then(result => {
//                 if (cache && cacheKey && hashCache) {
//                   Promise.resolve(cache.toCache(result))
//                     .then(result => hashCache.set(md5(cacheKey), result, {
//                       expire: cache.expire
//                     }))
//                     .catch(error => process.emit('log.error', error))
//                 }
//                 return result
//               })
//           })
//       }
//     })
//   }
// }
// const walkFile = require('./utils/walkFile')
// const objectForEach = require('./utils/objectForEach')
// module.exports = (app, { appPath, apiDir }) => {

//   const { env, api: apiConfig } = app.config

//   const API = config => createAPI(config)

//   const apiDirPaths = glob.sync(path.join(appPath, apiDir, '/'))
//   for (let apiDirPath of apiDirPaths) {
//     const apiRootPath = path.join('/', path.relative(appPath, apiDirPath), '/')
//     walkFile(apiDirPath, filePath => {
//       // 获取根据 appPath 的相对路径
//       let { name } = path.parse(path.relative(appPath, filePath))
//       // 通过用户方法返回 path
//       const apiPath = path.join(apiRootPath, name)
//       console.log(filePath,)
//       // 创建 api
//       const apis = {}
//       objectForEach(
//         requireAPI(filePath, env, onInitError),
//         (config, name) => {
//           const displayName = `API.${apiPath}.${name}`
//           const api = createAPI(Object.assign({}, apiConfig, config, {
//             displayName, filename: filePath
//           }))
//           // 因为是暴露出去的，所以不让修改
//           Object.assign(apis, { get [name]() { return api } })
//         })

//       // 挂机 api
//       // 因为是暴露出去的，所以不让修改
//       Object.assign(API, { get [apiPath]() { return apis } })
//     })
//   }

//   // 挂载到 global
//   if (global.API === undefined) {
//     // 因为是暴露出去的，所以不让修改
//     Object.assign(global, { get ['API']() { return API } })
//     return API
//   }
//   return Object.assign(global.API, API)
// }
