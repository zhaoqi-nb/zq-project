/**
 *  === view config ===
 *  模版渲染设置
 *
 *  created at: Wed May 17 2017 14:37:08 GMT+0800 (CST)
 */
import { CLIENT_PUBLIC_URL } from '../env';

const fs = require('fs');
const path = require('path');
const manifestPath = path.resolve(__dirname, '../asset-manifest.json');
let manifest;
if (fs.existsSync(manifestPath)) {
  const entrypoints = require(manifestPath).entrypoints;
  manifest = entrypoints.reduce(
    (result, entrypoint) => {
      if (/\.js$/.test(entrypoint)) {
        result.js.push(entrypoint);
      } else {
        result.css.push(entrypoint);
      }
      return result;
    },
    {
      js: [],
      css: [],
    },
  );
} else {
  manifest = {
    js: ['js/bundle.js', 'js/vendors.chunk.js', 'js/main.chunk.js'],
    css: [],
  };
}

export default {
  // 你想使用的模版类型，默认是 ejs
  template: 'ejs',

  // 项目 外层框架的模版 位置 （相对于 views 文件夹）
  layout: 'layout',

  // 拼装模版数据，在这边写，每次都会带上
  // 可以在这边定义 静态文件的版本号 之类的东西
  data: {
    title: 'My-Project',
    publicUrl: process.env.NODE_ENV === 'development' ? CLIENT_PUBLIC_URL.development : CLIENT_PUBLIC_URL.production,
    env: '',
    js: manifest.js,
    css: manifest.css,
  },

  // ejs 的配置
  ejs: {
    compileDebug: false,
    delimiter: '%',
    ext: '.ejs',
  },
};

// 开发环境配置
export const development = {
  data: {
    publicUrl: CLIENT_PUBLIC_URL.development,
  },
  ejs: {
    compileDebug: true,
  },
};
// 测试环境配置
export const testing = {
  data: {
    publicUrl: CLIENT_PUBLIC_URL.testing,
  },
};
