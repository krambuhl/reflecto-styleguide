const fs = require('fs')
const path = require('path')

const css = fs.readFileSync(path.resolve(__dirname, 'dist/bundle.css'))
const js = fs.readFileSync(path.resolve(__dirname, 'dist/bundle.js'))

const getConfig = ({ fonts, colors }) => {
  return {
    fonts: Object.assign({
      body: `"Helvetica Neue", "Helvetica", "Segoe UI", sans-serif`,
      headers: `"Helvetica Neue", "Helvetica", "Segoe UI", sans-serif`,
      code: `"Andale Mono", "Lucida Console", mono`
    }, fonts),
    colors: Object.assign({
      background: '#fff',
      text: '#666',
      active: '#4925a0',
      inlineCode: '#4925a0',
      tableHeaders: '#000',
      tableRowBorder: '#999',
      headerBackground: '#fff',
      headerTitle: '#999',
      headerLinks: '#666',
      headerBorder: '#ddd',
      exampleHeaderBackground: '#222',
      exampleHeaderForeground: '#fff',
      codeHeaderBackground: '#4925a0',
      codeHeaderForeground: '#fff',
      codeBackground: '#090226'
    }, colors)
  }
}

module.exports.css = (config) => {
  const { fonts, colors } = getConfig(config)
  return css
}

module.exports.js = (config) => {
  const { fonts, colors } = getConfig(config)
  return js
}
