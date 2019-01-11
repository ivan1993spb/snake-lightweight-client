
import urljoin from 'url-join'
import log from 'loglevel'
import Playground from './Playground'
import Controll from './Controll'
import WebSocketMock from '@/mocks/ws.game'
import {
  WS_URL, MOCK_WS, SERVER_MESSAGES_COUNTER_PERIOD_SEC
} from '@/common/config'

const ENABLE_MESSAGE_COUNT_LOGGING = log.getLevel() <= log.levels.DEBUG

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

    this._controll = new Controll()

    this.messagesCount = 0
    this.messagesCountInterval = 0
  }

  _handleServerMessage (message) {
    const m = JSON.parse(message)

    if (ENABLE_MESSAGE_COUNT_LOGGING) {
      this.messagesCount++
    }

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
          this._playground.setSize(message.payload.width, message.payload.height)
          break
        case 'snake':
          this._playground.setPlayerSnake(message.payload)
          break
        case 'notice':
          log.info('PLAYER NOTICE', message.payload)
          break
        case 'error':
          log.error('PLAYER ERROR', message.payload)
          break
        case 'countdown':
          log.info('PLAYER COUNTDOWN', message.payload, 'seconds')
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
    log.error('GAME ERROR', error)
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
      log.info('WS ONCLOSE')
    }

    this._ws.onerror = (event) => {
      log.error('WS ONERROR', event)
    }

    this._ws.onopen = (event) => {
      log.info('WS ONOPEN')
    }

    this._controll.oncommand = (command) => {
      if (typeof command === 'string') {
        try {
          this._ws.send(command)
        } catch (e) {
          log.error('cannot send controll command:', e)
        }
      } else {
        log.error('invalid game controll command')
      }
    }
  }

  _disconnect () {
    // Normal Closure
    this._ws.close(1000, 'Normal Closure')
  }

  start () {
    this._connect()
    this._playground.start()
    this._controll.start()

    if (ENABLE_MESSAGE_COUNT_LOGGING) {
      this.messagesCountInterval = setInterval(() => {
        const meanMessagesPerSec = this.messagesCount / SERVER_MESSAGES_COUNTER_PERIOD_SEC
        log.debug('messages count per second:', meanMessagesPerSec.toFixed(2))
        this.messagesCount = 0
      }, SERVER_MESSAGES_COUNTER_PERIOD_SEC * 1000)
    }
  }

  stop () {
    this._disconnect()
    this._playground.stop()
    this._controll.stop()

    if (ENABLE_MESSAGE_COUNT_LOGGING) {
      clearInterval(this.messagesCountInterval)
    }
  }
}

export default Game
