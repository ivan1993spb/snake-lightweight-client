
import _ from 'lodash'
import log from 'loglevel'

const LISTEN_TO_EVENT = 'resize'
const DEBOUNCE_WAIT = 300

export class ScreenSizeController {
  constructor (width, height) {
    this.update = () => {}

    this._width = width
    this._height = height

    this._listener = _.debounce(event => {
      log.info('EVENT RESIZE', event)
      this._handleResize()
    }, DEBOUNCE_WAIT)
  }

  _handleResize () {
    // TODO: calculate staff:
    // canvas size px - width and height
    // dot size - px
    // grid size - px
    this.update()
    // update invocation to resize canvases, to redraw all staff,
    // to replace map on screen
  }

  resize (width, height) {
    this._handleResize()
  }

  start () {
    window.addEventListener(LISTEN_TO_EVENT, this._listener)
  }

  stop () {
    window.removeEventListener(LISTEN_TO_EVENT, this._listener)
  }
}

export default ScreenSizeController
