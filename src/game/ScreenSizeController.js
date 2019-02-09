
import _ from 'lodash'

const LISTEN_TO_EVENT = 'resize'
const THROTTLE_WAIT = 1000

const DEFAULT_CLIENT_WIDTH = 1200
const DEFAULT_CLIENT_HEIGHT = 800

// const DOT_SIZE_MIN = 10
// const DOT_SIZE_MAX = 100

// const GRID_SIZE_MIN = 0
// const GRID_SIZE_MAX = 10

function clientSizePx () {
  return {
    width: window.innerWidth || document.documentElement.clientWidth ||
      document.body.clientWidth || DEFAULT_CLIENT_WIDTH,
    height: window.innerHeight || document.documentElement.clientHeight ||
      document.body.clientHeight || DEFAULT_CLIENT_HEIGHT
  }
}

export class ScreenSizeController {
  constructor (mapWidthDots, mapHeightDots) {
    this._mapWidthDots = mapWidthDots
    this._mapHeightDots = mapHeightDots

    this.onresize = () => {
      throw new Error('method to be triggered is not specified: onresize')
    }

    this._listener = _.throttle(() => {
      this._clientResize()
    }, THROTTLE_WAIT)
  }

  _calcMapSizePixel () {
    const { width, height } = clientSizePx()

    let mapWidthPixel = 0
    let mapHeightPixel = 0

    if (width > 600) {
      mapWidthPixel = Math.floor(width * 0.85)
    } else {
      mapWidthPixel = width
    }

    if (height > 600) {
      mapHeightPixel = Math.floor(height * 0.85)
    } else {
      mapHeightPixel = height
    }

    return {
      width: mapWidthPixel,
      height: mapHeightPixel
    }
  }

  gridProperties () {
    const {
      width: mapWidthPixel,
      height: mapHeightPixel
    } = this._calcMapSizePixel()

    const cell = Math.ceil(Math.min(mapWidthPixel, mapHeightPixel) / Math.max(this._mapWidthDots, this._mapHeightDots))
    const line = Math.floor(cell * 0.10)
    const dot = cell - line

    return {
      dot: dot,
      line: line,
      width: this._mapWidthDots,
      height: this._mapHeightDots
    }
  }

  mapProperties () {
    const { width, height } = clientSizePx()

    let mapWidthPixel = 0
    let mapHeightPixel = 0
    let x = 0
    let y = 0

    if (width > 600) {
      mapWidthPixel = Math.floor(width * 0.7)
      x = Math.floor((width - mapWidthPixel) / 2)
    } else {
      mapWidthPixel = width
      x = 0
    }

    if (height > 600) {
      mapHeightPixel = Math.floor(height * 0.7)
      y = Math.floor((height - mapHeightPixel) / 2)
    } else {
      mapHeightPixel = height
      y = 0
    }

    return {
      x: x,
      y: y,
      width: mapWidthPixel,
      height: mapHeightPixel
    }
  }

  _handleResize () {
    this.onresize({
      grid: this.gridProperties(),
      map: this.mapProperties()
    })
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
