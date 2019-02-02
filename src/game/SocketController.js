
import log from 'loglevel'

export class SocketController {
  constructor ({ webSocketFactory, srvMsgCounterEnable, srvMsgCounterPeriodSec }) {
    this._webSocketFactory = webSocketFactory
    this._srvMsgCounterEnable = srvMsgCounterEnable
    this._srvMsgCounterPeriodSec = srvMsgCounterPeriodSec
    this._msgCount = 0
    this._msgCountInterval = 0

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
    this._ws = this._webSocketFactory.create()

    this._ws.onmessage = (event) => {
      if (this._srvMsgCounterEnable) {
        this._msgCount++
      }

      this.onmessage(event.data)
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
    if (typeof data === 'string') {
      try {
        this._ws.send(data)
      } catch (e) {
        log.error('cannot send a data:', e)
      }
    } else {
      log.error('invalid data type: string expected')
    }
  }

  _disconnect () {
    this._ws.close(1000, 'Normal Closure')
  }

  _startMessageCountLogging () {
    this._msgCountInterval = setInterval(() => {
      const meanMessagesPerSec = this._msgCount / this._srvMsgCounterPeriodSec
      log.debug('messages count per second:', meanMessagesPerSec.toFixed(2))
      this._msgCount = 0
    }, this._srvMsgCounterPeriodSec * 1000)
  }

  _stopMessageCountLogging () {
    clearInterval(this._msgCountInterval)
  }

  start () {
    if (this._srvMsgCounterEnable) {
      this._startMessageCountLogging()
    }

    this._connect()
  }

  stop () {
    if (this._srvMsgCounterEnable) {
      this._stopMessageCountLogging()
    }

    this._disconnect()
  }
}

export default SocketController
