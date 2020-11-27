export function getSubPaths(pathname) {
  return pathname
    .replace(/\/?((\?|#).*)?$/, '')
    .split('/')
    .map((_, index, items) => items.slice(0, index + 1).join('/') || '/');
}
