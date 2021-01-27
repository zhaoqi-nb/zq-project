# My-antd4.0
# 客户端
clien 文件为客户端-实现前端页面的各种交互

技术点：react+webpack+dva+antd 

# node
server 文件为 node 层做接口转发

技术点：node.js、bable、koa、ejs模版


# 项目实现
项目使用node层的koa渲染前端页面，

## server文件下的env.js
nodePort为node层的端口号，分为线上环境、开发环境和测试环境
clientPublicUrl为客户端的静态资源分为线上环境、开发环境和测试环境
serverApiUrl为接口请求的域名配置

## server文件下的views文件
views文件为node层要渲染的ejs模版
