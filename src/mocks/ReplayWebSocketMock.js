
import BaseWebSocketMock from './BaseWebSocketMock'

const START_GAME_STREAM_DELAY = 50

const MESSAGE_CLOSE = {
  code: 1000,
  reason: '',
  type: 'close'
}

const MESSAGE_OPEN = {
  type: 'open'
}

export class ReplayWebSocketMock extends BaseWebSocketMock {
  constructor (replay) {
    super()

    this._replay = replay
    this._timeoutId = 0
    const onServerGameMessage = message => {
      this.onmessage({
        type: 'message',
        data: JSON.stringify(message)
      })
    }
    this._replay.onServerGameMessage = onServerGameMessage

    this._start()
  }

  _start () {
    this._timeoutId = setTimeout(() => {
      this.onopen(MESSAGE_OPEN)
      this._replay.start()
    }, START_GAME_STREAM_DELAY)
  }

  _stop () {
    clearTimeout(this._timeoutId)
    this._replay.stop()
    this.onclose(MESSAGE_CLOSE)
  }

  close () {
    this._stop()
  }
}

export default ReplayWebSocketMock
