
import log from 'loglevel'
import urljoin from 'url-join'
import {
  WS_URL, MOCK_WS, SERVER_MESSAGES_COUNTER_PERIOD_SEC
} from '@/common/config'
import WebSocketMock from '@/mocks/WebSocketMock'
import LoopGameReplay from '@/mocks/LoopGameReplay'
import WebSocketFactory from './WebSocketFactory'
import SocketController from './SocketController'

const ENABLE_MESSAGE_COUNT_LOGGING = log.getLevel() <= log.levels.DEBUG

export class SocketControllerFactory {
  constructor (id) {
    this._id = id
    this._socketURL = urljoin(WS_URL, 'games', this._id.toString())

    this._initWebSocketFactory()
  }

  _initWebSocketFactory () {
    if (MOCK_WS) {
      this._webSocketFactory = new WebSocketFactory(WebSocketMock, this._socketURL, new LoopGameReplay())
    } else {
      this._webSocketFactory = new WebSocketFactory(WebSocket, this._socketURL)
    }
  }

  create () {
    return new SocketController({
      webSocketFactory: this._webSocketFactory,
      srvMsgCounterEnable: ENABLE_MESSAGE_COUNT_LOGGING,
      srvMsgCounterPeriodSec: SERVER_MESSAGES_COUNTER_PERIOD_SEC
    })
  }
}

export default SocketControllerFactory
