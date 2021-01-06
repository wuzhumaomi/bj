export const openFileDialog = (callback, multiple = false) => {
  var input = document.createElement('input')
  input.type = 'file'
  if (multiple) {
    input.multiple = multiple
  }
  if (typeof callback === 'function') {
    input.addEventListener('change', callback)
  }

  var event = null
  if (document.createEvent) {
    event = document.createEvent('MouseEvent')
    event.initEvent('click', true, true)
  } else if (typeof MouseEvent === 'function') {
    event = new MouseEvent('click')
  }
  input.dispatchEvent(event)
}
