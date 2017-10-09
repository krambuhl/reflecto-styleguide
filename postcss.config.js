var nested = require('postcss-nested')
var cssnext = require('postcss-cssnext')

module.exports = {
  plugins: [
    nested(),
    cssnext()
  ]
}
