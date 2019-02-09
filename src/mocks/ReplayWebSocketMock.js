
import BaseWebSocketMock from './BaseWebSocketMock'

export class ReplayWebSocketMock extends BaseWebSocketMock {
  constructor (replay) {
    super()

    this._replay = replay
    this._replay.onServerGameMessage = message => {
      this.onmessage(JSON.stringify(message))
    }
    this._replay.start()
  }

  close () {
    this._replay.stop()
  }
}

export default ReplayWebSocketMock
