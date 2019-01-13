
import log from 'loglevel'

export const OBJECT_PLAYER = 0
export const OBJECT_SNAKE = 1
export const OBJECT_APPLE = 2
export const OBJECT_CORPSE = 3
export const OBJECT_WATERMELON = 4
export const OBJECT_WALL = 5

const X = 0
const Y = 1

const DOT_SIZE = 15

const COLOR_PLAYER = '#900'
const COLOR_SNAKE = '#f44'
const COLOR_APPLE = '#0f0'
const COLOR_CORPSE = '#00f'
const COLOR_WATERMELON = '#ff0'
const COLOR_WALL = '#eee'

export class Canvas {
  constructor (canvasSnakes, canvasFood, canvasWalls, canvasGrid, width, height) {
    this._canvasSnakes = canvasSnakes
    this._canvasFood = canvasFood
    this._canvasWalls = canvasWalls
    this._canvasGrid = canvasGrid

    this._width = width
    this._height = height

    this._contextSnakes = this._canvasSnakes.getContext('2d', { alpha: false })
    this._contextFood = this._canvasFood.getContext('2d', { alpha: true })
    this._contextWalls = this._canvasWalls.getContext('2d', { alpha: true })
    this._contextGrid = this._canvasGrid.getContext('2d', { alpha: true })

    this._resize()
  }

  _resize () {
    this._canvasSnakes.width = this._width * DOT_SIZE
    this._canvasSnakes.height = this._height * DOT_SIZE

    this._canvasFood.width = this._width * DOT_SIZE
    this._canvasFood.height = this._height * DOT_SIZE

    this._canvasWalls.width = this._width * DOT_SIZE
    this._canvasWalls.height = this._height * DOT_SIZE

    this._canvasGrid.width = this._width * DOT_SIZE
    this._canvasGrid.height = this._height * DOT_SIZE
  }

  clear (type, dots) {
    switch (type) {
      case OBJECT_PLAYER:
      case OBJECT_SNAKE:
        // That is the same: deleting a snake or delete the snake of a player.
        this._clear(this._contextSnakes, dots)
        break
      case OBJECT_APPLE:
      case OBJECT_CORPSE:
      case OBJECT_WATERMELON:
        // Deleting of any food is same operation.
        this._clear(this._contextFood, dots)
        break
      case OBJECT_WALL:
        this._clear(this._contextWalls, dots)
        break
      default:
        log.error('canvas clear invalid type', type)
    }
  }

  _clear (context, dots) {
    dots.forEach(dot => {
      context.clearRect(dot[X] * DOT_SIZE, dot[Y] * DOT_SIZE, DOT_SIZE, DOT_SIZE)
    })
  }

  draw (type, dots) {
    switch (type) {
      case OBJECT_PLAYER:
        this._draw(this._contextSnakes, COLOR_PLAYER, dots)
        break
      case OBJECT_SNAKE:
        this._draw(this._contextSnakes, COLOR_SNAKE, dots)
        break
      case OBJECT_APPLE:
        this._draw(this._contextFood, COLOR_APPLE, dots)
        break
      case OBJECT_CORPSE:
        this._draw(this._contextFood, COLOR_CORPSE, dots)
        break
      case OBJECT_WATERMELON:
        this._draw(this._contextFood, COLOR_WATERMELON, dots)
        break
      case OBJECT_WALL:
        this._draw(this._contextWalls, COLOR_WALL, dots)
        break
      default:
        log.error('canvas draw invalid type', type)
    }
  }

  _draw (context, color, dots) {
    context.fillStyle = color
    dots.forEach(dot => {
      context.fillRect(dot[X] * DOT_SIZE, dot[Y] * DOT_SIZE, DOT_SIZE, DOT_SIZE)
    })
  }

  clearAll () {
    this._contextSnakes.clearRect(0, 0, this.canvasSnakes.width,
      this.canvasSnakes.height)
    this._contextFood.clearRect(0, 0, this.canvasFood.width,
      this.canvasFood.height)
    this._contextWalls.clearRect(0, 0, this.canvasWalls.width,
      this.canvasWalls.height)
    this._contextGrid.clearRect(0, 0, this.canvasGrid.width,
      this.canvasGrid.height)
  }
}

export default Canvas
