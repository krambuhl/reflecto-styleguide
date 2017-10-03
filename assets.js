const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const css = fs.readFileSync(path.resolve(__dirname, 'dist/bundle.css')).toString()
const js = fs.readFileSync(path.resolve(__dirname, 'dist/bundle.js')).toString()

const template = ({
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

module.exports = ({
  demoFileName = 'demo.html',
  demoContent = {
    foot: `
      <script src="archive.js"></script>
      <script src="demo.js"></script>
    `
  },
  styleguideFileName = 'index.html',
  styleguideContent = {
    head: '<link href="styles.css" rel="stylesheet">',
    foot: `
      <script src="archive.js"></script>
      <script src="styleguide.js"></script>
    `
  },
  scriptFileName = 'styleguide.js',
  scriptContent = js,
  stylesFileName = 'styles.css',
  stylesContent = css,
  themeStylesFileName = 'theme.css',
  themeStylesContent = '',
  outputDirectory = 'styleguide'
}) => {
  const demo = typeof demoContent === 'object' ? template(demoContent) : demoContent
  const styleguide = typeof styleguideContent === 'object' ? template(styleguideContent) : styleguideContent

  const createFile = (name, content) => {
    return new Promise((resolve, reject) => {
      mkdirp(outputDirectory, (mkErr) => {
        if (mkErr) reject(mkErr)

        fs.writeFile(path.resolve(outputDirectory, name), Buffer.from(content), (err) => {
          if (err) reject(err)
          else resolve()
        })
      })
    })
  }

  return Promise.all([
    Promise.resolve(demo).then((res) => createFile(demoFileName, res)),
    Promise.resolve(styleguide).then((res) => createFile(styleguideFileName, res)),
    Promise.resolve(scriptContent).then((res) => createFile(scriptFileName, res)),
    Promise.resolve(stylesContent).then((res) => createFile(stylesFileName, res)),
    Promise.resolve(themeStylesContent).then((res) => createFile(themeStylesFileName, res))
  ])
}
