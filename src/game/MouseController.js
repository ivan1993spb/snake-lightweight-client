import log from 'loglevel'
import {
  COMMAND_EAST,
  COMMAND_NORTH,
  COMMAND_SOUTH,
  COMMAND_WEST
} from './commands'

const MOUSE_BUTTON = 1
let TOUCH_AVAILABLE
let LISTEN_TO_EVENT
if ('ontouchstart' in document.documentElement) {
  LISTEN_TO_EVENT = 'touchstart'
  TOUCH_AVAILABLE = true
} else {
  LISTEN_TO_EVENT = 'mousedown'
  TOUCH_AVAILABLE = false
}

export const DIRECTION_INVALID = -1
export const DIRECTION_NORTH = 0
export const DIRECTION_EAST = 1
export const DIRECTION_WEST = 2
export const DIRECTION_SOUTH = 3

export class MouseController {
  constructor (settings) {
    this.setScreen(settings)

    this.oncommand = command => {
      throw new Error('method to be triggered is not specified: oncommand')
    }

    this._listener = event => {
      if (event.buttons === MOUSE_BUTTON || TOUCH_AVAILABLE) {
        let pageX = TOUCH_AVAILABLE ? event.changedTouches[0].pageX : event.pageX
        let pageY = TOUCH_AVAILABLE ? event.changedTouches[0].pageY : event.pageY

        const direction = this._calc(pageX, pageY)

        if (direction !== DIRECTION_INVALID) {
          if (direction === DIRECTION_NORTH) {
            this.oncommand(COMMAND_NORTH)
          } else if (direction === DIRECTION_EAST) {
            this.oncommand(COMMAND_EAST)
          } else if (direction === DIRECTION_WEST) {
            this.oncommand(COMMAND_WEST)
          } else if (direction === DIRECTION_SOUTH) {
            this.oncommand(COMMAND_SOUTH)
          } else {
            log.error('unknown mouse direction')
          }
        }
      }
    }
  }

  setScreen ({ x, y, width, height }) {
    this._x = x
    this._y = y
    this._width = width
    this._height = height
  }

  _calc (x, y) {
    if (this._inArea(x, y)) {
      if (y < this._calcYbyX(x)) {
        if (x < this._calcXbyY(y)) {
          return DIRECTION_NORTH
        }

        return DIRECTION_EAST
      }

      if (x < this._calcXbyY(y)) {
        return DIRECTION_WEST
      }

      return DIRECTION_SOUTH
    }

    return DIRECTION_INVALID
  }

  _inArea (x, y) {
    return x >= this._x && y >= this._y && x < this._x + this._width && y < this._y + this._height
  }

  _calcYbyX (x) {
    return this._height / this._width * (x - this._x) + this._y
  }

  _calcXbyY (y) {
    return -this._width / this._height * (y - this._y - this._height) + this._x
  }

  start () {
    document.addEventListener(LISTEN_TO_EVENT, this._listener)
  }

  stop () {
    document.removeEventListener(LISTEN_TO_EVENT, this._listener)
  }
}

export default MouseController
