
import log from 'loglevel'
import urljoin from 'url-join'
import {
  MOCK_WS, SERVER_MESSAGES_COUNTER_PERIOD_SEC, WS_URL
} from '@/common/config'
import ReplayWebSocketMock from '@/mocks/ReplayWebSocketMock'
import LoopGameReplay from '@/mocks/LoopGameReplay'
import WebSocketFactory from './WebSocketFactory'
import SocketController from './SocketController'

const ENABLE_MESSAGE_COUNT_LOGGING = log.getLevel() <= log.levels.DEBUG
const DEFAULT_REPLAY_DELAY = 400

export class SocketControllerFactory {
  constructor (id) {
    this._id = id
    this._socketURL = urljoin(WS_URL, 'games', this._id.toString())

    this._initWebSocketFactory()
  }

  _initWebSocketFactory () {
    if (MOCK_WS) {
      this._webSocketFactory = new WebSocketFactory(ReplayWebSocketMock, new LoopGameReplay(DEFAULT_REPLAY_DELAY))
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
