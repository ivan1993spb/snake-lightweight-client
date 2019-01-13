
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

    // To prevent the case on map initialization when server sends objects message
    // after an object update message
    this.objectsLoaded = false
    this.objectsDeleteMessages = []
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
          log.info('received objects to load')
          this._handleServerMessagePlayerObjects(message)
          break
        default:
          log.error('invalid server message player type:', message.type)
      }
    }
  }

  _handleServerMessagePlayerObjects (message) {
    if (this.objectsLoaded) {
      log.error('objects have already loaded')
      return
    }

    this._playground.loadObjects(message.payload)
    this.objectsLoaded = true
    log.info('objects have loaded')

    if (this.objectsDeleteMessages.length > 0) {
      this.objectsDeleteMessages.forEach(message => {
        this._playground.handleGameEvent(message.type, message.payload)
      })
      log.info('outdated objects deleted:', this.objectsDeleteMessages.length)
      this.objectsDeleteMessages = []
    }
  }

  _handleServerMessageBroadcast (message) {
    log.info('BROADCAST', message)
  }

  _handleServerMessageGame (message) {
    if (message.hasOwnProperty('type') && message.hasOwnProperty('payload')) {
      if (!this.objectsLoaded) {
        log.warn('game message received before objects loading:', message.type)

        // While objects have not loaded:
        // Message type 'delete' - to cache
        // Message type 'create' - to pass
        // Message type 'update' - to ignore
        if (message.type === 'delete') {
          this.objectsDeleteMessages.push(message)
          return
        } else if (message.type === 'update') {
          return
        }
      }

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

  _startMessageCountLogging () {
    this.messagesCountInterval = setInterval(() => {
      const meanMessagesPerSec = this.messagesCount / SERVER_MESSAGES_COUNTER_PERIOD_SEC
      log.debug('messages count per second:', meanMessagesPerSec.toFixed(2))
      this.messagesCount = 0
    }, SERVER_MESSAGES_COUNTER_PERIOD_SEC * 1000)
  }

  _stopMessageCountLogging () {
    clearInterval(this.messagesCountInterval)
  }

  start () {
    this._connect()
    this._playground.start()
    this._controll.start()

    if (ENABLE_MESSAGE_COUNT_LOGGING) {
      this._startMessageCountLogging()
    }
  }

  stop () {
    this._disconnect()
    this._playground.stop()
    this._controll.stop()

    if (ENABLE_MESSAGE_COUNT_LOGGING) {
      this._stopMessageCountLogging()
    }
  }
}

export default Game
