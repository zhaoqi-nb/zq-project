const request = require('request')
const env = process.env.NODE_ENV;
const { SERVER_APIURL } = require('./env')
module.exports = (ctx) => {
  let { url, header, method, timeout } = ctx.request
  url = `${SERVER_APIURL.mock}${url}`.replace('/api', '')
  method = method.toUpperCase()
  let data = ctx.request.query;
  if (method === 'POST') {
    data = ctx.request.body
  }
  const requestOptions = {
    url,     // 请求地址
    data,
    method: method.toUpperCase(),  // 请求的方法
    timeout: timeout || 20000, // 请求超时时间
    // 处理 请求头
    encoding: 'utf8',
    // headers: Object.assign({
    //   'Content-Type': 'application/json',
    //   'User-Agent': 'zq-Agent',
    // }, header),
  }
  new Promise((resolve, reject) => {
    console.log(requestOptions)
    request({
      url,
      method,
      // httpSignature: { credential },
      headers: {
        Accept: header.accept,
        'Accept-Encoding': header['accept-encoding'],
        'Accept-Language': header['accept-language'],
        'content-type': header['content-type'] || header['Content-Type'],
      },
      ...param,
    })
      .on('error', error => {
        console.log(error)
      })
      .on('response', function (response) {
        const resp = response.toJSON()
        const respHeader = resp.headers
        for (let h in respHeader) {
          ctx.set(h, respHeader[h])
        }
      })
  })
}
