
import _ from 'lodash'
import log from 'loglevel'

export const OBJECT_PLAYER = 0
export const OBJECT_SNAKE = 1
export const OBJECT_APPLE = 2
export const OBJECT_CORPSE = 3
export const OBJECT_WATERMELON = 4
export const OBJECT_WALL = 5

export const COLOR_GRID = '#0a0'
export const COLOR_PLAYER = '#900'
export const COLOR_SNAKE = '#f44'
export const COLOR_APPLE = '#0f0'
export const COLOR_CORPSE = '#00f'
export const COLOR_WATERMELON = '#ff0'
export const COLOR_WALL = '#eee'

const ERROR_INVALID_DOT_SIZE = 'invalid dot size'
const ERROR_INVALID_LINE_SIZE = 'invalid line size'
const ERROR_INVALID_WIDTH = 'invalid line width'
const ERROR_INVALID_HEIGHT = 'invalid line height'

const X = 0
const Y = 1

export class Canvas {
  constructor ({ contexts, grid }) {
    this._setupGrid(grid)
    this._setupContext(contexts)
  }

  _setupGrid ({ dot, line, width, height }) {
    if (dot < 1) {
      throw new Error(ERROR_INVALID_DOT_SIZE)
    }
    if (line < 0) {
      throw new Error(ERROR_INVALID_LINE_SIZE)
    }
    if (width < 1) {
      throw new Error(ERROR_INVALID_WIDTH)
    }
    if (height < 1) {
      throw new Error(ERROR_INVALID_HEIGHT)
    }
    this._dot = dot
    this._line = line
    this._width = width
    this._height = height
  }

  _setupContexts ({ contextSnakes, contextFood, contextWalls, contextGrid }) {
    this._contextSnakes = contextSnakes
    this._contextFood = contextFood
    this._contextWalls = contextWalls
    this._contextGrid = contextGrid
  }

  _resizeContexts () {
    const { width, height } = this._canvasSize()

    this._contextSnakes.canvas.width = width
    this._contextSnakes.canvas.height = height

    this._contextFood.canvas.width = width
    this._contextFood.canvas.height = height

    this._contextWalls.canvas.width = width
    this._contextWalls.canvas.height = height

    this._contextGrid.canvas.width = width
    this._contextGrid.canvas.height = height
  }

  setGrid (grid) {
    this._clearAll()
    this._setupGrid(grid)
    this._resizeContexts()
    this._drawGrid()
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
      context.clearRect(this._getPxX(dot[X]), this._getPxY(dot[Y]), this._dotSize, this._dotSize)
    })
  }

  _getPxX (dotX) {
    return this._dot * dotX + this._line * (dotX + 1)
  }

  _getPxY (dotY) {
    return this._dot * dotY + this._line * (dotY + 1)
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
      context.fillRect(this._getPxX(dot[X]), this._getPxX(dot[Y]), this._dotSize, this._dotSize)
    })
  }

  _canvasSize () {
    return {
      width: this._dot * this._width + this._line * (this._width + 1),
      height: this._dot * this._height + this._line * (this._height + 1)
    }
  }

  _drawGrid () {
    this._contextGrid.fillStyle = COLOR_GRID

    const { width, height } = this._canvasSize()

    if (this._line > 0) {
      _.each(_.range(0, width, this._line + this._dot), lineX => {
        this._contextGrid.fillRect(lineX, 0, this._line, height)
      })

      _.each(_.range(0, height, this._line + this._dot), lineY => {
        this._contextGrid.fillRect(0, lineY, width, this._line)
      })
    }
  }

  _clearAll () {
    this._contextSnakes.clearRect(0, 0, this._contextSnakes.canvas.width,
      this._contextSnakes.canvas.height)
    this._contextFood.clearRect(0, 0, this._contextFood.canvas.width,
      this._contextFood.canvas.height)
    this._contextWalls.clearRect(0, 0, this._contextWalls.canvas.width,
      this._contextWalls.canvas.height)
    this._contextGrid.clearRect(0, 0, this._contextGrid.canvas.width,
      this._contextGrid.canvas.height)
  }
}

export default Canvas
