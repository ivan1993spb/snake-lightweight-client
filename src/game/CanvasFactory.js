
import Canvas from './Canvas'

export class CanvasFactory {
  constructor ({ canvasSnakes, canvasFood, canvasWalls, canvasGrid }, divCanvasHeight) {
    this._canvasSnakes = canvasSnakes
    this._canvasFood = canvasFood
    this._canvasWalls = canvasWalls
    this._canvasGrid = canvasGrid
    this._divHeight = divCanvasHeight

    this._initContexts()
  }

  _initContexts () {
    this._contextSnakes = this._canvasSnakes.getContext('2d', { alpha: false })
    this._contextFood = this._canvasFood.getContext('2d', { alpha: true })
    this._contextWalls = this._canvasWalls.getContext('2d', { alpha: true })
    this._contextGrid = this._canvasGrid.getContext('2d', { alpha: true })
  }

  create ({ grid, map }) {
    return new Canvas({
      contexts: {
        contextSnakes: this._contextSnakes,
        contextFood: this._contextFood,
        contextWalls: this._contextWalls,
        contextGrid: this._contextGrid
      },
      divHeight: this._divHeight,
      grid,
      map
    })
  }
}

export default CanvasFactory
