import log from 'loglevel'
import {
  COMMAND_NORTH,
  COMMAND_EAST,
  COMMAND_SOUTH,
  COMMAND_WEST
} from './commands'

const LISTEN_TO_EVENT = 'mousedown'
const MOUSE_BUTTON = 1

const DIRECTION_INVALID = -1
const DIRECTION_NORTH = 0
const DIRECTION_EAST = 1
const DIRECTION_WEST = 2
const DIRECTION_SOUTH = 3

export class MouseController {
  constructor (settings) {
    this.setScreen(settings)

    this.oncommand = command => {
      throw new Error('method to be triggered is not specified: oncommand')
    }

    this._listener = event => {
      if (event.buttons === MOUSE_BUTTON) {
        const direction = this._calc(event.clientX, event.clientY)

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
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  _calc (x, y) {
    if (this._inArea(x, y)) {
      if (y < this._calcYbyX(x)) {
        if (x < this._calcXbyY(y)) {
          return DIRECTION_NORTH
        }

        return DIRECTION_EAST
      } else {
        if (x < this._calcXbyY(y)) {
          return DIRECTION_WEST
        }

        return DIRECTION_SOUTH
      }
    }

    return DIRECTION_INVALID
  }

  _inArea (x, y) {
    return x >= this.x && y >= this.y && x < this.x + this.width && y < this.y + this.height
  }

  _calcYbyX (x) {
    return this.height / this.width * (x - this.x) + this.y
  }

  _calcXbyY (y) {
    return -this.width / this.height * (y - this.y - this.height) + this.x
  }

  start () {
    window.addEventListener(LISTEN_TO_EVENT, this._listener)
  }

  stop () {
    window.removeEventListener(LISTEN_TO_EVENT, this._listener)
  }
}

export default MouseController
