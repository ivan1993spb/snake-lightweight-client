
import log from 'loglevel'

export const OBJECT_PLAYER = 0
export const OBJECT_SNAKE = 1
export const OBJECT_APPLE = 2
export const OBJECT_CORPSE = 3
export const OBJECT_WATERMELON = 4
export const OBJECT_WALL = 5

export class Canvas {
  constructor (canvasSnakes, canvasFood, canvasWalls, canvasGrid) {
    this._canvasSnakes = canvasSnakes
    this._canvasFood = canvasFood
    this._canvasWalls = canvasWalls
    this._canvasGrid = canvasGrid

    this._contextSnakes = this._canvasSnakes.getContext('2d', { alpha: false })
    this._contextFood = this._canvasFood.getContext('2d', { alpha: true })
    this._contextWalls = this._canvasWalls.getContext('2d', { alpha: true })
    this._contextGrid = this._canvasGrid.getContext('2d', { alpha: true })
  }

  clear (type, dots) {
    log.info('CLEAR', type, dots)
    switch (type) {
      case OBJECT_PLAYER:
        break
      case OBJECT_SNAKE:
        break
      case OBJECT_APPLE:
        break
      case OBJECT_CORPSE:
        break
      case OBJECT_WATERMELON:
        break
      case OBJECT_WALL:
        break
      default:
        log.error('canvas clear invalid type', type)
    }
  }

  draw (type, dots) {
    log.info('DRAW', type, dots)
    switch (type) {
      case OBJECT_PLAYER:
        break
      case OBJECT_SNAKE:
        break
      case OBJECT_APPLE:
        break
      case OBJECT_CORPSE:
        break
      case OBJECT_WATERMELON:
        break
      case OBJECT_WALL:
        break
      default:
        log.error('canvas draw invalid type', type)
    }
  }
}

export default Canvas
