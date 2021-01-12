// == native modules ==
const path = require('path')
// == utils ==
const string2Array = require('./string2Array')

// utils modules
const utils = string2Array(`
  formatPath, noop, string2Array, view, walkFile
`)

for (let name of utils) exports[name] = require('./' + name)
