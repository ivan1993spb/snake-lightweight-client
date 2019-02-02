
export class GameReplay {
  constructor (messages) {
    this._state = 0
    this._messages = messages
  }

  next () {
    const message = this._messages[this._state]

    if (this._messages.length - 1 > this._state) {
      this._state++
    }

    return message
  }
}

export default GameReplay
