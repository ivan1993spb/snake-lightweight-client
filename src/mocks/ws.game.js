
const SNAKE_LOOP_START = 16

const serverMessages = [
  { 'type': 'player', 'payload': { 'type': 'notice', 'payload': 'welcome to snake-server!' } },
  { 'type': 'player', 'payload': { 'type': 'size', 'payload': { 'width': 10, 'height': 10 } } },
  { 'type': 'player',
    'payload': { 'type': 'objects',
      'payload': [
        { 'uuid': '51e48b51-3c06-4365-9001-39904fd98fea', 'dots': [[7, 3]], 'type': 'wall' },
        { 'uuid': 'd96fec39-a924-44ad-945b-4f89fdd5981b', 'dots': [[6, 8], [7, 8], [6, 7], [7, 7]], 'type': 'wall' },
        { 'uuid': '74470a49-eb4f-4b9b-bb92-53c9302e5b45', 'dots': [[5, 1], [6, 1], [5, 3], [6, 3], [6, 2], [7, 2]], 'type': 'wall' },
        { 'uuid': '366a6b80-3d26-4ca1-96f1-07ffd4d9514f', 'dots': [[2, 4], [3, 4], [4, 4], [5, 4]], 'type': 'wall' },
        { 'uuid': '1363eb18-b7d5-415b-bef2-fae9f7c3c8c1', 'dot': [6, 6], 'type': 'apple' },
        { 'uuid': 'b2d9ed75-9615-45af-b1ec-8b80b2ddb82a', 'dot': [3, 8], 'type': 'apple' }
      ] } },
  { 'type': 'player', 'payload': { 'type': 'countdown', 'payload': 5 } },
  { 'type': 'broadcast', 'payload': 'user joined your game group' },
  { 'type': 'player', 'payload': { 'type': 'notice', 'payload': 'start' } },
  { 'type': 'player', 'payload': { 'type': 'error', 'payload': 'cannot create snake' } },
  { 'type': 'player', 'payload': { 'type': 'countdown', 'payload': 5 } },
  { 'type': 'player', 'payload': { 'type': 'notice', 'payload': 'start' } },
  { 'type': 'player', 'payload': { 'type': 'snake', 'payload': 'd1861021-871c-4b80-99da-7b7279275243' } },
  { 'type': 'game', 'payload': { 'type': 'create', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[3, 6], [2, 6], [1, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[4, 6], [3, 6], [2, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[5, 6], [4, 6], [3, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'delete', 'payload': { 'uuid': '1363eb18-b7d5-415b-bef2-fae9f7c3c8c1', 'dot': [6, 6], 'type': 'apple' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[6, 6], [5, 6], [4, 6], [3, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'create', 'payload': { 'uuid': '0f3140e5-efff-49d0-80f6-e80afb72ece7', 'dot': [3, 3], 'type': 'apple' } } },

  // SNAKE_LOOP_START
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[7, 6], [6, 6], [5, 6], [4, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[8, 6], [7, 6], [6, 6], [5, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[9, 6], [8, 6], [7, 6], [6, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[0, 6], [9, 6], [8, 6], [7, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[1, 6], [0, 6], [9, 6], [8, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[2, 6], [1, 6], [0, 6], [9, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[3, 6], [2, 6], [1, 6], [0, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[4, 6], [3, 6], [2, 6], [1, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[5, 6], [4, 6], [3, 6], [2, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'uuid': 'd1861021-871c-4b80-99da-7b7279275243', 'dots': [[6, 6], [5, 6], [4, 6], [3, 6]], 'type': 'snake' } } }
]

class GameMock {
  constructor () {
    this._state = 0
  }

  next () {
    const serverMessage = serverMessages[this._state]

    if (serverMessages.length - 1 > this._state) {
      this._state++
    } else {
      this._state = SNAKE_LOOP_START
    }

    return serverMessage
  }
}

const MESSAGE_CLOSE = {
  code: 1000,
  reason: '',
  type: 'close'
}

const MESSAGE_OPEN = {
  type: 'open'
}

export class WebSocketMock {
  constructor (socketUrl) {
    this._game = new GameMock()

    this.onmessage = event => {}
    this.onclose = event => {}
    this.onerror = event => {}
    this.onopen = event => {}

    this._intervalId = 0

    this._start()
  }

  _start () {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId)

      this.onopen(MESSAGE_OPEN)

      this._intervalId = setInterval(() => {
        this.onmessage({
          type: 'message',
          data: JSON.stringify(this._game.next())
        })
      }, 500)
    }, 500)
  }

  _stop () {
    clearInterval(this._intervalId)

    this.onclose(MESSAGE_CLOSE)
  }

  close () {
    this._stop()
  }
}

export default WebSocketMock
