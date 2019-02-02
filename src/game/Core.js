
import log from 'loglevel'
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
    this._mouseController = new MouseController(this._screenSizeController.mapProperties())

    this._canvas = canvasFactory.create(this._screenSizeController.gridProperties())
    this._playground = new Playground(this._canvas)
    this._handler = new Handler(this._playground)

    this._initSocketController()
    this._initScreenSizeController()
    this._initKeyboardController()
    this._initMouseController()
  }

  _initSocketController () {
    this._socketController.onmessage = (serverMessage) => {
      this._handler.handleServerMessage(serverMessage)
    }
    this._socketController.onclose = () => {
      // TODO: Implement handler.
      log.info('%$ ONCLOSE')
    }
    this._socketController.onerror = () => {
      // TODO: Implement handler.
      log.info('%$ ONERROR')
    }
    this._socketController.onopen = () => {
      // TODO: Implement handler.
      log.info('%$ ONOPEN')
    }
  }

  _initScreenSizeController () {
    this._screenSizeController.onresize = () => {
      // TODO: Implement handler.
      log.info('%$ ONRESIZE')
    }
  }

  _initKeyboardController () {
    this._keyboardController.oncommand = () => {
      // TODO: Implement handler.
      log.info('%$ ONCOMMAND KEYBOARD')
    }
  }

  _initMouseController () {
    this._mouseController.oncommand = () => {
      // TODO: Implement handler.
      log.info('%$ ONCOMMAND MOUSE')
    }
  }

  start () {
    this._socketController.start()
    this._screenSizeController.start()
    this._keyboardController.start()
    this._mouseController.start()
  }

  stop () {
    this._socketController.stop()
    this._screenSizeController.stop()
    this._keyboardController.stop()
    this._mouseController.stop()
  }
}

export default Core
