const startDemo = require('../lib/startDemo')

document.addEventListener('DOMContentLoaded', (ev) => {
  const rootEl = document.querySelector('.root')
  startDemo(rootEl)
})
