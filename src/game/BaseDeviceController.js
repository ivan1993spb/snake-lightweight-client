import log from 'loglevel'
import {
  COMMAND_EAST,
  COMMAND_NORTH,
  COMMAND_SOUTH,
  COMMAND_WEST
} from './commands'

export const DIRECTION_INVALID = -1
export const DIRECTION_NORTH = 0
export const DIRECTION_EAST = 1
export const DIRECTION_WEST = 2
export const DIRECTION_SOUTH = 3

export class BaseDeviceController {
  constructor (screenSettings, eventToListen) {
    this.setScreen(screenSettings)

    this.oncommand = command => {
      throw new Error('method to be triggered is not specified: oncommand')
    }

    this._listenToEvent = eventToListen

    this._listener = event => {
      throw new Error('method to be triggered is not specified: _listener')
    }
  }

  _turnCommandByDot (x, y) {
    const direction = this._calc(x, y)

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
    if (this._listenToEvent) {
      document.addEventListener(this._listenToEvent, this._listener)
    }
  }

  stop () {
    if (this._listenToEvent) {
      document.removeEventListener(this._listenToEvent, this._listener)
    }
  }
}

export default BaseDeviceController
