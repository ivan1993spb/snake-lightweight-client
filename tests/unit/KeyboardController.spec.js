import KeyboardController from '@/game/KeyboardController'

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

function makeEventKeydown(keyCode) {
  return {
    type: 'keydown',
    keyCode,
    preventDefault: jest.fn()
  }
}

describe('KeyboardController', () => {
  it('KeyboardController SPACE key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_SPACE)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1);
    expect(controller.oncommand.mock.calls.length).toBe(0);
  })

  it('KeyboardController PAGE UP key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_PAGE_UP)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1);
    expect(controller.oncommand.mock.calls.length).toBe(0);
  })

  it('KeyboardController PAGE DOWN key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_PAGE_DOWN)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1);
    expect(controller.oncommand.mock.calls.length).toBe(0);
  })

  it('KeyboardController END key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_END)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1);
    expect(controller.oncommand.mock.calls.length).toBe(0);
  })

  it('KeyboardController HOME key works correctly and default behaviour are disabled', () => {
    const controller = new KeyboardController()
    controller.oncommand = jest.fn()
    const event = makeEventKeydown(KEY_HOME)
    controller._listener(event)
    expect(event.preventDefault.mock.calls.length).toBe(1);
    expect(controller.oncommand.mock.calls.length).toBe(0);
  })
})
