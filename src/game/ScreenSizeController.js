
import _ from 'lodash'
import {
  clientSizePx,
  clientScrollPx,
  clientPx
} from '@/common/helpers'

const LISTEN_TO_EVENT = 'resize'
const THROTTLE_WAIT = 1000

const LINE_SIZE_MIN = 1
const LINE_SIZE_PERCENT = 0.10
const DOT_SIZE_MIN = 5
const MAP_SIZE_LIMIT_PERCENT = 0.98
const BORDER_SIZE = 4

const SCREEN_WIDTH_LIMIT = 600
const SCREEN_HEIGHT_LIMIT = 600

export class ScreenSizeController {
  constructor (mapWidthDots, mapHeightDots, divCanvasHeight) {
    this._mapWidthDots = mapWidthDots
    this._mapHeightDots = mapHeightDots
    this._divCanvasHeight = divCanvasHeight

    this.onresize = () => {
      throw new Error('method to be triggered is not specified: onresize')
    }

    this._listener = _.throttle(() => {
      this._clientResize()
    }, THROTTLE_WAIT)
  }

  _calcMapSizePixelLimits () {
    const { width, height } = clientSizePx()

    let mapWidthPixel = 0
    let mapHeightPixel = 0

    if (width > SCREEN_WIDTH_LIMIT) {
      mapWidthPixel = Math.floor(width * MAP_SIZE_LIMIT_PERCENT)
    } else {
      mapWidthPixel = width
    }

    if (height > SCREEN_HEIGHT_LIMIT) {
      mapHeightPixel = Math.floor(height * MAP_SIZE_LIMIT_PERCENT)
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
      width: mapWidthPixelLimit,
      height: mapHeightPixelLimit
    } = this._calcMapSizePixelLimits()

    const cell = Math.min(
      Math.floor((mapWidthPixelLimit - BORDER_SIZE * 2) / this._mapWidthDots),
      Math.floor((mapHeightPixelLimit - BORDER_SIZE * 2) / this._mapHeightDots)
    )

    let line = Math.floor(cell * LINE_SIZE_PERCENT)
    if (line < LINE_SIZE_MIN && (cell - line) > DOT_SIZE_MIN) {
      line = LINE_SIZE_MIN
    }
    const dot = cell - line

    return {
      dot: dot,
      line: line,
      border: BORDER_SIZE,
      width: this._mapWidthDots,
      height: this._mapHeightDots
    }
  }

  mapProperties () {
    const { dot, line, border } = this.gridProperties()

    const mapWidthPixel = dot * this._mapWidthDots + line * (this._mapWidthDots + 1) + border * 2
    const mapHeightPixel = dot * this._mapHeightDots + line * (this._mapHeightDots + 1) + border * 2

    const { width } = clientSizePx()

    let x = 0
    let y = 0

    if (width > SCREEN_WIDTH_LIMIT) {
      x = Math.floor((width - mapWidthPixel) / 2)
    } else {
      x = 0
    }

    const domRectOffsets = this._divCanvasHeight.getBoundingClientRect()
    const { scrollTop } = clientScrollPx()
    const { clientTop } = clientPx()
    const offsetTop = Math.round(domRectOffsets.top + scrollTop - clientTop)

    y = offsetTop

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
