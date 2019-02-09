
const LOOP_REPLAY_FILE_NAME = 'loop.replay'

export class LoopGameReplay {
  constructor (delay) {
    this._delay = delay
    this._interval = 0
    this.onServerGameMessage = () => {
      throw new Error('LoopGameReplay: onServerGameMessage was not specified')
    }
  }

  start () {
    // Attention, motherfuckers! This shit works only with concatenation! o_O
    // https://github.com/webpack/webpack/issues/6680#issuecomment-370800037
    import('./replays/' + LOOP_REPLAY_FILE_NAME)
      .then(module => module.default)
      .then(replay => {
        const messages = replay.messages
        const loopStartIndex = replay.loopStart
        let index = 0

        this._interval = setInterval(() => {
          if (messages.length - 1 > index) {
            index++
          } else {
            index = loopStartIndex
          }
          this.onServerGameMessage(messages[index])
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

export default LoopGameReplay
