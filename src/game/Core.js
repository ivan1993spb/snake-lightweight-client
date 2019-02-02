
import CanvasFactory from './CanvasFactory'
import SocketControllerFactory from './SocketControllerFactory'
import KeyboardController from './KeyboardController'
import ScreenSizeController from './ScreenSizeController'
import MouseController from './MouseController'
import Handler from './Handler'
import Playground from './Playground'

export class Core {
  constructor ({ canvases, map, id }) {
    const canvasFactory = new CanvasFactory(canvases)
    const socketControllerFactory = new SocketControllerFactory(id)

    this._socketController = socketControllerFactory.create()
    this._screenSizeController = new ScreenSizeController(map.width, map.height)
    this._keyboardController = new KeyboardController()
    this._mouseController = new MouseController(this._screenSizeController.mouse())

    this._canvas = canvasFactory.create(this._screenSizeController.grid())
    this._playground = new Playground(this._canvas)
    this._handler = new Handler(this._playground)
  }

  start () {
    this._screenSizeController.start()
  }

  stop () {
    this._screenSizeController.stop()
  }
}

export default Core
