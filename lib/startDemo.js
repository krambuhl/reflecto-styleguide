module.exports = (el) => {
  const render = ({ type, name, id }) => {
    const example = __ElementArchive__.getExample(type, name, id)

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

    __ElementArchive__.renderComponent(el, example.component)
  }

  return render
}
