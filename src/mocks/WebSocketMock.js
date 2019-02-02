
const MESSAGE_CLOSE = {
  code: 1000,
  reason: '',
  type: 'close'
}

const MESSAGE_OPEN = {
  type: 'open'
}

const MESSAGE_RECEIVE_DELAY = 500

export class WebSocketMock {
  constructor (socketUrl, game) {
    this._game = game

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

    this._intervalId = 0

    this._start()
  }

  _start () {
    this._timeoutId = setTimeout(() => {
      this.onopen(MESSAGE_OPEN)

      this._intervalId = setInterval(() => {
        this.onmessage({
          type: 'message',
          data: JSON.stringify(this._game.next())
        })
      }, MESSAGE_RECEIVE_DELAY)
    }, MESSAGE_RECEIVE_DELAY)
  }

  _stop () {
    clearTimeout(this._timeoutId)

    clearInterval(this._intervalId)

    this.onclose(MESSAGE_CLOSE)
  }

  close () {
    this._stop()
  }

  send (data) {
  }
}

export default WebSocketMock
