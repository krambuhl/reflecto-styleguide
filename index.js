const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const readFilePromise = (filepath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })

const defaultTemplate = ({
  head = '',
  body = '<div class="root"></div>',
  foot = ''
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${head}
  </head>
  <body>
    ${body}
    ${foot}
  </body>
</html>
`

const defaultDemoContent = {
  foot: `
    <script src="archive.js"></script>
    <script src="demo.js"></script>
  `
}

const defaultStyleguideContent = {
  head: '<link href="styles.css" rel="stylesheet">',
  foot: `
    <script src="archive.js"></script>
    <script src="styleguide.js"></script>
  `
}

const defaultScriptContent = readFilePromise(path.resolve(__dirname, 'dist/bundle.js'))
const defaultStylesContent = readFilePromise(path.resolve(__dirname, 'dist/bundle.css'))
const defaultThemeStylesContent = readFilePromise(path.resolve(__dirname, 'dist/theme.css'))
const defaultDemoScriptContent = readFilePromise(path.resolve(__dirname, 'dist/demo.js'))

module.exports = ({
  archiveName = 'Archive',
  demoFileName = 'demo.html',
  demoContent = {},
  styleguideFileName = 'index.html',
  styleguideContent = {},
  scriptFileName = 'styleguide.js',
  scriptContent = defaultScriptContent,
  demoScriptFileName = 'demo.js',
  demoScriptContent = defaultDemoScriptContent,
  stylesFileName = 'styles.css',
  stylesContent = defaultStylesContent,
  themeStylesFileName = 'theme.css',
  themeStylesContent = defaultThemeStylesContent,
  outputDirectory = 'styleguide'
}) => {
  scriptContent = readFilePromise(path.resolve(__dirname, 'dist/bundle.js'))
  stylesContent = readFilePromise(path.resolve(__dirname, 'dist/bundle.css'))
  themeStylesContent = readFilePromise(path.resolve(__dirname, 'dist/theme.css'))
  demoScriptContent = readFilePromise(path.resolve(__dirname, 'dist/demo.js'))

  const demo = typeof demoContent === 'object'
    ? defaultTemplate(Object.assign({}, defaultDemoContent, demoContent))
    : demoContent
  const styleguide = typeof styleguideContent === 'object'
    ? defaultTemplate(Object.assign({}, defaultStyleguideContent, styleguideContent))
    : styleguideContent

  const createFile = (name, content) =>
    new Promise((resolve, reject) => {
      mkdirp(outputDirectory, (mkErr) => {
        if (mkErr) reject(mkErr)

        fs.writeFile(path.resolve(outputDirectory, name), Buffer.from(content), (err) => {
          if (err) reject(err)
          else resolve()
        })
      })
    })

  return Promise.all([
    demoContent &&
      Promise.resolve(demo)
        .then((res) => createFile(demoFileName, res)),

    styleguideContent &&
      Promise.resolve(styleguide)
        .then((res) => createFile(styleguideFileName, res)),

    scriptContent &&
      Promise.resolve(scriptContent)
        .then((res) => {
          res = res.replace(/__ElementArchive__/g, archiveName)
          createFile(scriptFileName, res)
        }),

    demoScriptContent &&
      Promise.resolve(demoScriptContent).then((res) => {
        res = res.replace(/__ElementArchive__/g, archiveName)
        return createFile(demoScriptFileName, res)
      }),

    stylesContent &&
      Promise.resolve(stylesContent)
        .then((res) => createFile(stylesFileName, res)),

    themeStylesContent &&
      Promise.resolve(themeStylesContent)
        .then((res) => createFile(themeStylesFileName, res))
  ].filter((a) => a)) // remove undefined
}
