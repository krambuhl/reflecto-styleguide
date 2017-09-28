const fs = require('fs')
const path = require('path')

const css = fs.readFileSync(path.resolve(__dirname, 'dist/bundle.css'))
const js = fs.readFileSync(path.resolve(__dirname, 'dist/bundle.js'))

module.exports.css = ({ fonts, colors }) => css
module.exports.js = ({ fonts, colors }) => js
