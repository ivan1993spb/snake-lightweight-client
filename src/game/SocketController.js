
import log from 'loglevel'
import urljoin from 'url-join'
import WebSocketMock from '@/mocks/ws.game'
import {
  WS_URL, MOCK_WS, SERVER_MESSAGES_COUNTER_PERIOD_SEC
} from '@/common/config'

const ENABLE_MESSAGE_COUNT_LOGGING = log.getLevel() <= log.levels.DEBUG

export class SocketController {
  constructor (id) {
    this._id = id
    this._socketURL = urljoin(WS_URL, 'games', this._id.toString())
    this.messagesCount = 0
    this.messagesCountInterval = 0

    this.onmessage = () => {
      throw new Error('method to be triggered is not specified: onmessage')
    }
    this.onclose = () => {
      throw new Error('method to be triggered is not specified: onclose')
    }
    this.onerror = () => {
      throw new Error('method to be triggered is not specified: onerror')
    }
    this.onopen = () => {
      throw new Error('method to be triggered is not specified: onopen')
    }
  }

  _connect () {
    if (MOCK_WS) {
      this._ws = new WebSocketMock(this._socketURL)
    } else {
      this._ws = new WebSocket(this._socketURL)
    }

    this._ws.onmessage = (event) => {
      if (ENABLE_MESSAGE_COUNT_LOGGING) {
        this.messagesCount++
      }

      // TODO: Deserialize event.data
      this.onmessage()
    }

    this._ws.onclose = (event) => {
      log.info('WS ONCLOSE')
      this.onclose()
    }

    this._ws.onerror = (event) => {
      log.error('WS ONERROR', event)
      this.onerror()
    }

    this._ws.onopen = (event) => {
      log.info('WS ONOPEN')
      this.onerror()
    }
  }

  send (data) {
    // TODO: Serialize data to send
    if (typeof data === 'string') {
      try {
        this._ws.send(data)
      } catch (e) {
        log.error('cannot send controll command:', e)
      }
    } else {
      log.error('invalid game controll command')
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
    if (ENABLE_MESSAGE_COUNT_LOGGING) {
      this._startMessageCountLogging()
    }
  }

  stop () {
    if (ENABLE_MESSAGE_COUNT_LOGGING) {
      this._stopMessageCountLogging()
    }

    this._disconnect()
  }
}

export default SocketController
