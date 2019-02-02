
import log from 'loglevel'
import urljoin from 'url-join'
import {
  WS_URL, MOCK_WS, SERVER_MESSAGES_COUNTER_PERIOD_SEC
} from '@/common/config'
import SocketController from './SocketController'
import WebSocketMock from '@/mocks/WebSocketMock'

const ENABLE_MESSAGE_COUNT_LOGGING = log.getLevel() <= log.levels.DEBUG

export class SocketControllerFactory {
  constructor (id) {
    this._id = id
    this._socketURL = urljoin(WS_URL, 'games', this._id.toString())

    if (MOCK_WS) {
      this._wsClass = WebSocketMock
    } else {
      this._wsClass = WebSocket
    }
  }

  create () {
    return new SocketController({
      wsUrl: this._socketURL,
      wsClass: this._wsClass,
      srvMsgCounterEnable: ENABLE_MESSAGE_COUNT_LOGGING,
      srvMsgCounterPeriodSec: SERVER_MESSAGES_COUNTER_PERIOD_SEC
    })
  }
}

export default SocketControllerFactory
