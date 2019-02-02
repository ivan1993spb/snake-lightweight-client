
import _ from 'lodash'

const LISTEN_TO_EVENT = 'resize'
const DEBOUNCE_WAIT = 300

const DEFAULT_CLIENT_WIDTH = 1200
const DEFAULT_CLIENT_HEIGHT = 800

const DOT_SIZE_MIN = 10
const DOT_SIZE_MAX = 100

const GRID_SIZE_MIN = 0
const GRID_SIZE_MAX = 10

function clientSizePixel () {
  return {
    width: window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      DEFAULT_CLIENT_WIDTH,
    height: window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      DEFAULT_CLIENT_HEIGHT
  }
}

export class ScreenSizeController {
  constructor (mapWidthDots, mapHeightDots) {
    this._mapWidthDots = mapWidthDots
    this._mapHeightDots = mapHeightDots

    const { width, height } = clientSizePixel()
    this._clientWidthPixel = width
    this._clientHeightPixel = height

    this.update = () => {
      throw new Error('method to be triggered is not specified: update')
    }

    this._listener = _.debounce(() => {
      this._clientResize()
    }, DEBOUNCE_WAIT)
  }

  _handleResize () {
    const mapWidthPixel = (this._mapWidthDots * dotSize) + ((this._mapWidthDots + 1) * gridSize)
    const mapHeightPixel = (this._mapHeightDots * dotSize) + ((this._mapHeightDots + 1) * gridSize)

    // canvas size px - width and height
    // canvas x and y
    // dot size - px
    // grid size - px

    this.update()
    // update invocation to resize canvases, to redraw all staff,
    // to replace map on screen
  }

  _clientResize () {
    const { width, height } = clientSizePixel()
    let flagResize = false

    if (this._clientWidthPixel !== width) {
      this._clientWidthPixel = width
      flagResize = true
    }

    if (this._clientHeightPixel !== height) {
      this._clientHeightPixel = height
      flagResize = true
    }

    if (flagResize) {
      this._handleResize()
    }
  }

  mapResize (mapWidthDots, mapHeightDots) {
    let flagResize = false

    if (this._mapWidthDots !== mapWidthDots) {
      this._mapWidthDots = mapWidthDots
      flagResize = true
    }

    if (this._mapHeightDots !== mapHeightDots) {
      this._mapHeightDots = mapHeightDots
      flagResize = true
    }

    if (flagResize) {
      this._handleResize()
    }
  }

  start () {
    window.addEventListener(LISTEN_TO_EVENT, this._listener)
  }

  stop () {
    window.removeEventListener(LISTEN_TO_EVENT, this._listener)
  }
}

export default ScreenSizeController
