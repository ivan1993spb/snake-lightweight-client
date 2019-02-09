
export class FileGameReplay {
  constructor (replayFile, delay) {
    this._replayFile = replayFile
    this.onServerGameMessage = () => {
      throw new Error('FileGameReplay: onServerGameMessage was not specified')
    }
    this._delay = delay
    this._interval = 0
  }

  start () {
    import('./replays/' + this._replayFile)
      .then(module => module.default)
      .then(module => {
        const messages = module.messages

        this._interval = setInterval(() => {
          this.onServerGameMessage(messages.shift())
        }, this._delay)
      })
      .catch(error => {
        const errorMessage = `importing game replay file error: ${error}`

        this.onServerGameMessage({
          type: 'player',
          payload: {
            type: 'error',
            payload: errorMessage.toString()
          }
        })
      })
  }

  stop () {
    clearInterval(this._interval)
  }
}

export default FileGameReplay
