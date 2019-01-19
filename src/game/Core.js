
import Canvas from './Canvas'
import Playground from './Playground'
import Game from './Game'
import KeyboardController from './KeyboardController'
import ScreenSizeController from './ScreenSizeController'
import SocketController from './SocketController'

export class Core {
  constructor ({ canvasSnakes, canvasFood, canvasWalls, canvasGrid, id }) {
    this._canvasSnakes = canvasSnakes
    this._canvasFood = canvasFood
    this._canvasWalls = canvasWalls
    this._canvasGrid = canvasGrid

    this._contextSnakes = canvasSnakes.getContext('2d', { alpha: false })
    this._contextFood = canvasFood.getContext('2d', { alpha: true })
    this._contextWalls = canvasWalls.getContext('2d', { alpha: true })
    this._contextGrid = canvasGrid.getContext('2d', { alpha: true })

    this._canvas = new Canvas(
      this._contextSnakes,
      this._contextFood,
      this._contextWalls,
      this._contextGrid
    )

    this._playground = new Playground(this._canvas)
    this._game = new Game(this._playground)
    this._keyboardController = new KeyboardController()
    this._screenSizeController = new ScreenSizeController(100, 100)
    this._socketController = new SocketController(id)
  }

  start () {
    this._screenSizeController.start()
  }

  stop () {
    this._screenSizeController.stop()
  }
}

export default Core
