module.exports = ({
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

module.exports.demo = ({
  head = '',
  body,
  foot = '<script src="demo.js"></script>'
}) => module.exports({
  head,
  body,
  foot
})

module.exports.styleguide = ({
  head = '',
  body,
  foot = ''
}) => module.exports({
  head,
  body,
  foot
})
