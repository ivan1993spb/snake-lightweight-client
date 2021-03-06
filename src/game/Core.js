
import log from 'loglevel'
import { USE_TOUCH } from '@/common/config'
import CanvasFactory from './CanvasFactory'
import SocketControllerFactory from './SocketControllerFactory'
import KeyboardController from './KeyboardController'
import ScreenSizeController from './ScreenSizeController'
import MouseController from './MouseController'
import TouchController from './TouchController'
import GameController from './GameController'
import Playground from './Playground'
import CountdownBar from './CountdownBar'

export class Core {
  constructor ({ canvases, map, game, elements, divCanvasHeight }) {
    const canvasFactory = new CanvasFactory(canvases, divCanvasHeight)
    const socketControllerFactory = new SocketControllerFactory(game.id)

    this._socketController = socketControllerFactory.create()
    this._screenSizeController = new ScreenSizeController(map.width, map.height, divCanvasHeight)
    this._keyboardController = new KeyboardController()
    if (USE_TOUCH) {
      this._deviceController = new TouchController(this._screenSizeController.mapProperties())
    } else {
      this._deviceController = new MouseController(this._screenSizeController.mapProperties())
    }

    this._canvas = canvasFactory.create({
      grid: this._screenSizeController.gridProperties(),
      map: this._screenSizeController.mapProperties()
    })
    this._playground = new Playground(this._canvas)

    this._gameController = new GameController(this._playground)

    this._countdownBar = new CountdownBar({
      element: elements.countdown,
      map: this._screenSizeController.mapProperties()
    })

    this._initGameController()
    this._initSocketController()
    this._initScreenSizeController()
    this._initKeyboardController()
    this._initDeviceController()
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
      this._countdownBar.activateCountdown(countdown)
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
      this._canvas.setPropertions({ grid, map })
      this._playground.redrawFromCaches()

      this._deviceController.setScreen(map)
      this._countdownBar.setScreen(map)
    }
  }

  _initKeyboardController () {
    this._keyboardController.oncommand = (command) => {
      this._socketController.send(command)
    }
  }

  _initDeviceController () {
    this._deviceController.oncommand = (command) => {
      this._socketController.send(command)
    }
  }

  start () {
    this._socketController.start()
    this._screenSizeController.start()
    this._keyboardController.start()
    this._deviceController.start()
    this._gameController.start()
  }

  stop () {
    this._socketController.stop()
    this._screenSizeController.stop()
    this._keyboardController.stop()
    this._deviceController.stop()
    this._gameController.stop()

    // Deactivate countdown if exists.
    this._countdownBar.stop()
  }
}

export default Core
