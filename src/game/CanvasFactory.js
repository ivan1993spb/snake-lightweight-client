
import Canvas from './Canvas'

export class CanvasFactory {
  constructor ({ canvasGame }, divCanvasHeight) {
    this._canvasGame = canvasGame
    this._divHeight = divCanvasHeight

    this._initContexts()
  }

  _initContexts () {
    this._contextGame = this._canvasGame.getContext('2d', { alpha: false })
  }

  create ({ grid, map }) {
    return new Canvas({
      contexts: {
        contextGame: this._contextGame
      },
      divHeight: this._divHeight,
      grid,
      map
    })
  }
}

export default CanvasFactory
