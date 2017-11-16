const { getModule } = require('reflecto-archive')
const { examples, renderComponent } = __ElementArchive__ // eslint-disable-line

module.exports = (el) => {
  const render = ({ type, name, id }) => {
    const def = getModule(examples, { type, name, id })

    if (!(def && def.example)) {
      el.innerHTML = 'Example not found'
      return
    }

    const { example } = def
    const { title, backgroundColor, padding, component } = example

    document.title = title
    document.body.style.backgroundColor = backgroundColor || ''

    if (padding !== undefined) {
      el.style.padding = padding || ''
    } else {
      el.style.padding = '2em'
    }

    renderComponent(el, component)
  }

  return render
}
