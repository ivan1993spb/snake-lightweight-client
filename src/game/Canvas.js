
export const OBJECT_PLAYER = 0
export const OBJECT_SNAKE = 1
export const OBJECT_APPLE = 2
export const OBJECT_CORPSE = 3
export const OBJECT_WATERMELON = 4
export const OBJECT_WALL = 5
export const OBJECT_HIGHLIGHTED = 6
export const OBJECT_MOUSE = 7

export const COLOR_BORDER = '#010'
export const COLOR_GRID = '#020'
export const COLOR_PLAYER = '#900'
export const COLOR_SNAKE = '#f44'
export const COLOR_APPLE = '#0f0'
export const COLOR_CORPSE = '#00f'
export const COLOR_WATERMELON = '#ff0'
export const COLOR_WALL = '#115'
export const COLOR_HIGHLIGHTED = '#f88'
export const COLOR_MOUSE = '#f00'

const ERROR_INVALID_DOT_SIZE = 'invalid dot size'
const ERROR_INVALID_LINE_SIZE = 'invalid line size'
const ERROR_INVALID_WIDTH = 'invalid width'
const ERROR_INVALID_HEIGHT = 'invalid height'
const ERROR_INVALID_BORDER = 'invalid border size'

const X = 0
const Y = 1

export class Canvas {
  constructor ({ contexts, grid, map, divHeight }) {
    this._divHeight = divHeight

    this._setupGrid(grid)
    this._setupMap(map)
    this._setupContexts(contexts)
    this._resizeContexts()
    this._locateContexts()
    this._drawGrid()
    this._drawBorder()
  }

  _setupGrid ({ dot, line, width, height, border }) {
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
    if (border < 0) {
      throw new Error(ERROR_INVALID_BORDER)
    }
    this._dot = dot
    this._line = line
    this._width = width
    this._height = height
    this._border = border
  }

  _setupContexts ({ contextSnakes, contextFood, contextWalls, contextGrid }) {
    this._contextSnakes = contextSnakes
    this._contextFood = contextFood
    this._contextWalls = contextWalls
    this._contextGrid = contextGrid
  }

  _setupMap ({ x, y, width, height }) {
    this._x = x
    this._y = y
    this._widthPx = width
    this._heightPx = height
  }

  _resizeContexts () {
    this._contextSnakes.canvas.width = this._widthPx
    this._contextSnakes.canvas.height = this._heightPx

    this._contextFood.canvas.width = this._widthPx
    this._contextFood.canvas.height = this._heightPx

    this._contextWalls.canvas.width = this._widthPx
    this._contextWalls.canvas.height = this._heightPx

    this._contextGrid.canvas.width = this._widthPx
    this._contextGrid.canvas.height = this._heightPx

    this._divHeight.style.height = `${this._heightPx}px`
  }

  _locateContexts () {
    this._contextSnakes.canvas.style.left = `${this._x}px`
    this._contextSnakes.canvas.style.top = `${this._y}px`

    this._contextFood.canvas.style.left = `${this._x}px`
    this._contextFood.canvas.style.top = `${this._y}px`

    this._contextWalls.canvas.style.left = `${this._x}px`
    this._contextWalls.canvas.style.top = `${this._y}px`

    this._contextGrid.canvas.style.left = `${this._x}px`
    this._contextGrid.canvas.style.top = `${this._y}px`
  }

  setPropertions ({ grid, map }) {
    this._clearAll()
    this._setupGrid(grid)
    this._setupMap(map)
    this._resizeContexts()
    this._locateContexts()
    this._drawGrid()
    this._drawBorder()
  }

  clear (type, dots) {
    switch (type) {
      case OBJECT_PLAYER:
      case OBJECT_SNAKE:
      case OBJECT_HIGHLIGHTED:
        // That is the same: deleting a snake or delete the snake of a player.
        this._clear(this._contextSnakes, dots)
        break
      case OBJECT_APPLE:
      case OBJECT_CORPSE:
      case OBJECT_WATERMELON:
      case OBJECT_MOUSE:
        // Deleting of any food is same operation.
        this._clear(this._contextFood, dots)
        break
      case OBJECT_WALL:
        this._clear(this._contextWalls, dots)
        break
      default:
        throw new Error(`Canvas.clear: invalid type ${type}`)
    }
  }

  _clear (context, dots) {
    dots.forEach(dot => {
      context.clearRect(
        this._getPxX(dot[X]),
        this._getPxY(dot[Y]),
        this._dot,
        this._dot
      )
    })
  }

  _getPxX (dotX) {
    return this._border + this._dot * dotX + this._line * (dotX + 1)
  }

  _getPxY (dotY) {
    return this._border + this._dot * dotY + this._line * (dotY + 1)
  }

  draw (type, dots) {
    switch (type) {
      case OBJECT_PLAYER:
        this._draw(this._contextSnakes, COLOR_PLAYER, dots)
        break
      case OBJECT_SNAKE:
        this._draw(this._contextSnakes, COLOR_SNAKE, dots)
        break
      case OBJECT_HIGHLIGHTED:
        this._draw(this._contextSnakes, COLOR_HIGHLIGHTED, dots)
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
      case OBJECT_MOUSE:
        this._draw(this._contextFood, COLOR_MOUSE, dots)
        break
      default:
        throw new Error(`Canvas.draw: invalid type ${type}`)
    }
  }

  _draw (context, color, dots) {
    context.fillStyle = color
    dots.forEach(dot => {
      context.fillRect(
        this._getPxX(dot[X]),
        this._getPxY(dot[Y]),
        this._dot,
        this._dot
      )
    })
  }

  _drawGrid () {
    this._contextGrid.fillStyle = COLOR_GRID

    if (this._line > 0) {
      for (let lineX = this._border; lineX < this._widthPx - this._border; lineX += this._line + this._dot) {
        this._contextGrid.fillRect(lineX, this._border, this._line, this._heightPx - this._border * 2)
      }

      for (let lineY = this._border; lineY < this._heightPx - this._border; lineY += this._line + this._dot) {
        this._contextGrid.fillRect(this._border, lineY, this._widthPx - this._border * 2, this._line)
      }
    }
  }

  _drawBorder () {
    if (this._border < 1) {
      return
    }

    this._contextGrid.fillStyle = COLOR_BORDER

    // Western boreder
    this._contextGrid.fillRect(0, 0, this._border, this._heightPx)
    // Northern boreder
    this._contextGrid.fillRect(0, 0, this._widthPx, this._border)
    // Eastern boreder
    this._contextGrid.fillRect(this._widthPx - this._border, 0, this._border, this._heightPx)
    // Southern boreder
    this._contextGrid.fillRect(0, this._heightPx - this._border, this._widthPx, this._border)
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
