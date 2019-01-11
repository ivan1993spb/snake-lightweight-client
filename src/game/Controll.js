
const LISTEN_TO_EVENT = 'keydown'

// Keys
const KEY_SPACE = 32
const KEY_PAGE_UP = 33
const KEY_PAGE_DOWN = 34
const KEY_END = 35
const KEY_HOME = 36
const KEY_W = 87
const KEY_A = 65
const KEY_S = 83
const KEY_D = 68
const KEY_I = 73
const KEY_J = 74
const KEY_K = 75
const KEY_L = 76
const KEY_ARROW_UP = 38
const KEY_ARROW_LEFT = 37
const KEY_ARROW_DOWN = 40
const KEY_ARROW_RIGHT = 39
const KEY_NUMPAD_8 = 104
const KEY_NUMPAD_4 = 100
const KEY_NUMPAD_2 = 98
const KEY_NUMPAD_6 = 102

// Kays to controll
const KEYS_NORTH = [KEY_W, KEY_I, KEY_ARROW_UP, KEY_NUMPAD_8]
const KEYS_EAST = [KEY_D, KEY_L, KEY_ARROW_RIGHT, KEY_NUMPAD_6]
const KEYS_SOUTH = [KEY_S, KEY_K, KEY_ARROW_DOWN, KEY_NUMPAD_2]
const KEYS_WEST = [KEY_A, KEY_J, KEY_ARROW_LEFT, KEY_NUMPAD_4]

// Keys to disable default behaviour
const KEYS_DISABLE_DEFAULT_BEHAVIOUR = [
  KEY_SPACE,
  KEY_PAGE_UP,
  KEY_PAGE_DOWN,
  KEY_END,
  KEY_HOME,
  KEY_ARROW_UP,
  KEY_ARROW_LEFT,
  KEY_ARROW_DOWN,
  KEY_ARROW_RIGHT
]

// Commands to send:
// Command north sets snake direction to the north
const COMMAND_NORTH = JSON.stringify({
  type: 'snake',
  payload: 'north'
})
// Command east sets snake direction to the east
const COMMAND_EAST = JSON.stringify({
  type: 'snake',
  payload: 'east'
})
// Command south sets snake direction to the south
const COMMAND_SOUTH = JSON.stringify({
  type: 'snake',
  payload: 'south'
})
// Command west sets snake direction to the west
const COMMAND_WEST = JSON.stringify({
  type: 'snake',
  payload: 'west'
})

export class Controll {
  constructor () {
    this.oncommand = command => {}

    this._listener = event => {
      if (KEYS_DISABLE_DEFAULT_BEHAVIOUR.indexOf(event.keyCode) !== -1) {
        event.preventDefault()
      }

      if (KEYS_NORTH.indexOf(event.keyCode) !== -1) {
        this.oncommand(COMMAND_NORTH)
      } else if (KEYS_EAST.indexOf(event.keyCode) !== -1) {
        this.oncommand(COMMAND_EAST)
      } else if (KEYS_SOUTH.indexOf(event.keyCode) !== -1) {
        this.oncommand(COMMAND_SOUTH)
      } else if (KEYS_WEST.indexOf(event.keyCode) !== -1) {
        this.oncommand(COMMAND_WEST)
      }
    }
  }

  start () {
    window.addEventListener(LISTEN_TO_EVENT, this._listener)
  }

  stop () {
    window.removeEventListener(LISTEN_TO_EVENT, this._listener)
  }
}

export default Controll
