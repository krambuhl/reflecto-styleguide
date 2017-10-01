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

const replaceTokens = (str, { fonts, colors }) => {
  Object.keys(fonts).forEach((key) => {
    const regex = new RegExp(`getFont\\(${key}\\)`, 'g')
    str = str.replace(regex, fonts[key])
  })

  Object.keys(colors).forEach((key) => {
    const regex = new RegExp(`getColor\\(${key}\\)`, 'g')
    str = str.replace(regex, colors[key])
  })

  return str
}

module.exports.css = (config) =>
  replaceTokens(css.toString(), getConfig(config))

module.exports.js = (config) =>
  replaceTokens(js.toString(), getConfig(config))
