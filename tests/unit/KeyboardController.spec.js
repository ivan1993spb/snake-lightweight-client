import KeyboardController from '@/game/KeyboardController'
import {
  COMMAND_NORTH,
  COMMAND_EAST,
  COMMAND_SOUTH,
  COMMAND_WEST
} from '@/game/commands'

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

function makeEventKeydown (keyCode) {
  return {
    type: 'keydown',
    keyCode,
    preventDefault: jest.fn()
  }
}

describe('KeyboardController check ignore buttons', () => {
  it('KeyboardController SPACE key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_SPACE)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls.length).toBe(0)
  })

  it('KeyboardController PAGE UP key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_PAGE_UP)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls.length).toBe(0)
  })

  it('KeyboardController PAGE DOWN key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_PAGE_DOWN)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls.length).toBe(0)
  })

  it('KeyboardController END key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_END)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls.length).toBe(0)
  })

  it('KeyboardController HOME key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_HOME)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls.length).toBe(0)
  })
})

describe('KeyboardController check WASD', () => {
  it('KeyboardController W key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_W)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_NORTH)
  })

  it('KeyboardController A key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_A)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_WEST)
  })

  it('KeyboardController S key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_S)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_SOUTH)
  })

  it('KeyboardController D key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_D)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_EAST)
  })
})

describe('KeyboardController check IJKL', () => {
  it('KeyboardController I key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_I)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_NORTH)
  })

  it('KeyboardController J key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_J)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_WEST)
  })

  it('KeyboardController K key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_K)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_SOUTH)
  })

  it('KeyboardController L key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_L)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_EAST)
  })
})

describe('KeyboardController check arrows', () => {
  it('KeyboardController ARROW_UP key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_ARROW_UP)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_NORTH)
  })

  it('KeyboardController ARROW_LEFT key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_ARROW_LEFT)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_WEST)
  })

  it('KeyboardController ARROW_DOWN key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_ARROW_DOWN)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_SOUTH)
  })

  it('KeyboardController ARROW_RIGHT key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_ARROW_RIGHT)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_EAST)
  })
})

describe('KeyboardController check numpad', () => {
  it('KeyboardController NUMPAD_8 key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_NUMPAD_8)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_NORTH)
  })

  it('KeyboardController NUMPAD_4 key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_NUMPAD_4)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_WEST)
  })

  it('KeyboardController NUMPAD_2 key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_NUMPAD_2)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_SOUTH)
  })

  it('KeyboardController NUMPAD_6 key works correctly', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_NUMPAD_6)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(controller.oncommand.mock.calls.length).toBe(1)
    expect(controller.oncommand.mock.calls[0][0]).toBe(COMMAND_EAST)
  })
})
