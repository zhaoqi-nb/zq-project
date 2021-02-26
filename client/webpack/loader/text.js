function replace(source) {
  // 使用正则把 // @require '../style/index.css' 转换成 require('../style/index.css');
  return source.replace(/(\/\/ *@require) +(('|").+('|")).*/, 'require($2);');
}

module.exports = function (content) {
  console.log(content)
  return replace(content);
};
