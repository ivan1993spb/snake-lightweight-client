
import urljoin from 'url-join'
import log from 'loglevel'
import Playground from './Playground'
import WebSocketMock from '@/mocks/ws.game'
import { WS_URL, MOCK_WS } from '@/common/config'

export class Game {
  constructor (canvasSnakes, canvasFood, canvasWalls, canvasGrid, id, width, height) {
    this._id = id
    this._socketURL = urljoin(WS_URL, 'games', this._id.toString())

    this._playground = new Playground(
      canvasSnakes,
      canvasFood,
      canvasWalls,
      canvasGrid,
      width,
      height
    )
  }

  _handleServerMessage (message) {
    const m = JSON.parse(message)

    if (m.hasOwnProperty('type') && m.hasOwnProperty('payload')) {
      if (m.type === 'game') {
        this._handleServerMessageGame(m.payload)
      } else if (m.type === 'player') {
        this._handleServerMessagePlayer(m.payload)
      } else if (m.type === 'broadcast') {
        this._handleServerMessageBroadcast(m.payload)
      } else {
        log.warn('invalid server message type', m.type)
      }
    }
  }

  _handleServerMessagePlayer (message) {
    if (message.hasOwnProperty('type') && message.hasOwnProperty('payload')) {
      switch (message.type) {
        case 'size':
          break
        case 'snake':
          this._playground.setPlayerSnake(message.payload)
          break
        case 'notice':
          break
        case 'error':
          break
        case 'countdown':
          break
        case 'objects':
          this._playground.loadObjects(message.payload)
          break
      }
    }
  }

  _handleServerMessageBroadcast (message) {
    log.info('BROADCAST', message)
  }

  _handleServerMessageGame (message) {
    if (message.hasOwnProperty('type') && message.hasOwnProperty('payload')) {
      if (message.type !== 'error') {
        this._playground.handleGameEvent(message.type, message.payload)
      } else {
        this._handleServerMessageGameError(message.payload)
      }
    }
  }

  _handleServerMessageGameError (error) {
    log.info('GAME ERROR', error)
  }

  _connect () {
    if (MOCK_WS) {
      this._ws = new WebSocketMock(this._socketURL)
    } else {
      this._ws = new WebSocket(this._socketURL)
    }

    this._ws.onmessage = (event) => {
      this._handleServerMessage(event.data)
    }

    this._ws.onclose = (event) => {
      log.info('onclose', event)
    }

    this._ws.onerror = (event) => {
      log.info('onerror', event)
    }

    this._ws.onopen = (event) => {
      log.info('onopen', event)
    }
  }

  _disconnect () {
    // Normal Closure
    this._ws.close(1000, 'Normal Closure')
  }

  start () {
    this._connect()
  }

  stop () {
    this._disconnect()
    this._playground.stop()
  }
}

export default Game
