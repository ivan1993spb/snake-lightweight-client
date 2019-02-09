
import log from 'loglevel'
import CanvasFactory from './CanvasFactory'
import SocketControllerFactory from './SocketControllerFactory'
import KeyboardController from './KeyboardController'
import ScreenSizeController from './ScreenSizeController'
import MouseController from './MouseController'
import GameController from './GameController'
import Playground from './Playground'

export class Core {
  constructor ({ canvases, map, game }) {
    const canvasFactory = new CanvasFactory(canvases)
    const socketControllerFactory = new SocketControllerFactory(game.id)

    this._socketController = socketControllerFactory.create()
    this._screenSizeController = new ScreenSizeController(map.width, map.height)
    this._keyboardController = new KeyboardController()
    this._mouseController = new MouseController(this._screenSizeController.mapProperties())

    this._canvas = canvasFactory.create(this._screenSizeController.gridProperties())
    this._playground = new Playground(this._canvas)

    this._gameController = new GameController(this._playground)

    this._initGameController()
    this._initSocketController()
    this._initScreenSizeController()
    this._initKeyboardController()
    this._initMouseController()
  }

  _initGameController () {
    this._gameController.onmapresize = (width, height) => {
      this._screenSizeController.mapResize(width, height)
    }
    this._gameController.onplayernotice = (notice) => {
      // TODO: Implement method.
      log.info('PLAYER NOTICE', notice)
    }
    this._gameController.onplayererror = (error) => {
      // TODO: Implement method.
      log.info('PLAYER ERROR', error)
    }
    this._gameController.oncountdown = (countdown) => {
      // TODO: Implement method.
      log.info('COUNTDOWN', countdown)
    }
  }

  _initSocketController () {
    this._socketController.onmessage = serverMessage => {
      this._gameController.handleServerMessage(serverMessage)
    }
    this._socketController.onclose = event => {
      log.info('Game WebSocket has been closed')
    }
    this._socketController.onerror = error => {
      log.error('Game WebSocket error:', error)
    }
    this._socketController.onopen = event => {
      log.info('Game WebSocket has been opened')
    }
  }

  _initScreenSizeController () {
    this._screenSizeController.onresize = ({ grid, map }) => {
      this._canvas.setGrid(grid)
      this._mouseController.setScreen(map)
      this._playground.redrawFromCaches()
    }
  }

  _initKeyboardController () {
    this._keyboardController.oncommand = (command) => {
      this._socketController.send(command)
    }
  }

  _initMouseController () {
    this._mouseController.oncommand = (command) => {
      this._socketController.send(command)
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
