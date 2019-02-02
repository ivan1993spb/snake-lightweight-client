
import _ from 'lodash'

const LISTEN_TO_EVENT = 'resize'
const THROTTLE_WAIT = 300

const DEFAULT_CLIENT_WIDTH = 1200
const DEFAULT_CLIENT_HEIGHT = 800

// const DOT_SIZE_MIN = 10
// const DOT_SIZE_MAX = 100

// const GRID_SIZE_MIN = 0
// const GRID_SIZE_MAX = 10

function clientSizePx () {
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

    const { width, height } = clientSizePx()
    this._clientWidthPixel = width
    this._clientHeightPixel = height

    this.onresize = () => {
      throw new Error('method to be triggered is not specified: onresize')
    }

    this._listener = _.throttle(() => {
      this._clientResize()
    }, THROTTLE_WAIT)
  }

  gridProperties () {
    // TODO: Implement grid method to initialize Canvas
    return {
      dot: 10,
      line: 0,
      width: this._mapWidthDots,
      height: this._mapHeightDots
    }
  }

  mapProperties () {
    // TODO: Implement grid method to initialize MouseController
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }
  }

  _handleResize () {
    // canvas size px - width and height
    // const mapWidthPixel = (this._mapWidthDots * dotSize) + ((this._mapWidthDots + 1) * gridSize)
    // const mapHeightPixel = (this._mapHeightDots * dotSize) + ((this._mapHeightDots + 1) * gridSize)

    // canvas x and y
    // dot size - px
    // grid size - px

    this.onresize(this.gridProperties())
    // onresize invocation to resize canvases, to redraw all staff,
    // to replace map on screen
  }

  _clientResize () {
    const { width, height } = clientSizePx()
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
