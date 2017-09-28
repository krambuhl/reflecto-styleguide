const qs = require('query-string')

module.exports.startDemo = (el, { archive, onStart }) => {
  const render = ({ type, name, id }) => {
    const example = archive.getExample(type, name, id)

    if (!example) {
      el.innerHTML = 'Example not found'
      return
    }

    document.body.style.backgroundColor = example.backgroundColor ? example.backgroundColor : ''

    if (example.padding !== undefined) {
      el.style.padding = example.padding ? example.padding : ''
    } else {
      el.style.padding = '2em'
    }

    document.title = example.title

    el.innerHTML = ''
    el.appendChild(example.component)
  }

  // render inital page
  render(qs.parse(global.location.search))

  // run start up script if defined
  // This can be used to inject styles
  if (onStart) {
    onStart()
  }

  return render
}
