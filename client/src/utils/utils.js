export function getSubPaths(pathname) {
  return pathname
    .replace(/\/?((\?|#).*)?$/, '')
    .split('/')
    .map((_, index, items) => items.slice(0, index + 1).join('/') || '/');
}

export const debounce = (method, wait) => {
  let timeout;
  // args为返回函数调用时传入的参数，传给method
  const debounced = (...args) => {
    console.log(new Date().getTime());
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      // args是一个数组，所以使用fn.apply
      // 也可写作method.call(context, ...args)
      method.apply(context, args);
    }, wait);
  };
  return debounced;
};
