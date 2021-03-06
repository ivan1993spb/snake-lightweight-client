import CanvasRenderingContext2DMock from '@/mocks/CanvasRenderingContext2DMock'
import {
  COLOR_APPLE,
  COLOR_CORPSE,
  COLOR_PLAYER,
  COLOR_SNAKE,
  COLOR_WALL,
  COLOR_WATERMELON,
  Canvas,
  OBJECT_APPLE,
  OBJECT_CORPSE,
  OBJECT_PLAYER,
  OBJECT_SNAKE,
  OBJECT_WALL,
  OBJECT_WATERMELON
} from '@/game/Canvas'

const DOT_SIZE = 20
const LINE_SIZE = 0
const MAP_WIDTH = 100
const MAP_HEIGHT = 100
const CANVAS_WIDTH = DOT_SIZE * MAP_WIDTH + LINE_SIZE * (MAP_WIDTH + 1)
const CANVAS_HEIGHT = DOT_SIZE * MAP_HEIGHT + LINE_SIZE * (MAP_HEIGHT + 1)

describe('game canvas', () => {
  it('canvas constructor works correctly', () => {
    const contextGame = new CanvasRenderingContext2DMock(CANVAS_WIDTH, CANVAS_HEIGHT)
    const canvas = new Canvas({
      contexts: {
        contextGame
      },
      grid: {
        dot: DOT_SIZE,
        line: LINE_SIZE,
        width: MAP_WIDTH,
        height: MAP_HEIGHT,
        border: 0
      },
      map: {
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
      },
      divHeight: {
        style: {}
      }
    })

    expect(canvas._contextGame).toBe(contextGame)
    expect(canvas._dot).toBe(DOT_SIZE)
  })

  it('canvas draws snakes to snakes context', () => {
    const contextGame = new CanvasRenderingContext2DMock(CANVAS_WIDTH, CANVAS_HEIGHT)
    const canvas = new Canvas({
      contexts: {
        contextGame
      },
      grid: {
        dot: DOT_SIZE,
        line: LINE_SIZE,
        width: MAP_WIDTH,
        height: MAP_HEIGHT,
        border: 0
      },
      map: {
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
      },
      divHeight: {
        style: {}
      }
    })

    canvas.draw(OBJECT_SNAKE, [[0, 0]])
    expect(contextGame.popCall()).toEqual({
      'args': [0, 0, 20, 20],
      'methodName': 'fillRect',
      'props': {
        'canvas': {
          'height': CANVAS_HEIGHT,
          'width': CANVAS_WIDTH,
          'style': { left: '0px', top: '0px' }
        },
        'fillStyle': COLOR_SNAKE,
        'strokeStyle': '#000'
      }
    })
  })

  it('canvas draws apples to food context', () => {
    const contextGame = new CanvasRenderingContext2DMock(CANVAS_WIDTH, CANVAS_HEIGHT)
    const canvas = new Canvas({
      contexts: {
        contextGame
      },
      grid: {
        dot: DOT_SIZE,
        line: LINE_SIZE,
        width: MAP_WIDTH,
        height: MAP_HEIGHT,
        border: 0
      },
      map: {
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
      },
      divHeight: {
        style: {}
      }
    })

    canvas.draw(OBJECT_APPLE, [[0, 0]])
    expect(contextGame.popCall()).toEqual({
      'args': [0, 0, 20, 20],
      'methodName': 'fillRect',
      'props': {
        'canvas': {
          'height': CANVAS_HEIGHT,
          'width': CANVAS_WIDTH,
          'style': { left: '0px', top: '0px' }
        },
        'fillStyle': COLOR_APPLE,
        'strokeStyle': '#000'
      }
    })
  })

  it('canvas draws corpses to food context', () => {
    const contextGame = new CanvasRenderingContext2DMock(CANVAS_WIDTH, CANVAS_HEIGHT)
    const canvas = new Canvas({
      contexts: {
        contextGame
      },
      grid: {
        dot: DOT_SIZE,
        line: LINE_SIZE,
        width: MAP_WIDTH,
        height: MAP_HEIGHT,
        border: 0
      },
      map: {
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
      },
      divHeight: {
        style: {}
      }
    })

    canvas.draw(OBJECT_CORPSE, [[0, 0]])
    expect(contextGame.popCall()).toEqual({
      'args': [0, 0, 20, 20],
      'methodName': 'fillRect',
      'props': {
        'canvas': {
          'height': CANVAS_HEIGHT,
          'width': CANVAS_WIDTH,
          'style': { left: '0px', top: '0px' }
        },
        'fillStyle': COLOR_CORPSE,
        'strokeStyle': '#000'
      }
    })
  })

  it('canvas draws walls to walls context', () => {
    const contextGame = new CanvasRenderingContext2DMock(CANVAS_WIDTH, CANVAS_HEIGHT)
    const canvas = new Canvas({
      contexts: {
        contextGame
      },
      grid: {
        dot: DOT_SIZE,
        line: LINE_SIZE,
        width: MAP_WIDTH,
        height: MAP_HEIGHT,
        border: 0
      },
      map: {
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
      },
      divHeight: {
        style: {}
      }
    })

    canvas.draw(OBJECT_WALL, [[0, 0]])
    expect(contextGame.popCall()).toEqual({
      'args': [0, 0, 20, 20],
      'methodName': 'fillRect',
      'props': {
        'canvas': {
          'height': CANVAS_HEIGHT,
          'width': CANVAS_WIDTH,
          'style': { left: '0px', top: '0px' }
        },
        'fillStyle': COLOR_WALL,
        'strokeStyle': '#000'
      }
    })
  })

  it('canvas draws player snake to snakes context with special filling color', () => {
    const contextGame = new CanvasRenderingContext2DMock(CANVAS_WIDTH, CANVAS_HEIGHT)
    const canvas = new Canvas({
      contexts: {
        contextGame
      },
      grid: {
        dot: DOT_SIZE,
        line: LINE_SIZE,
        width: MAP_WIDTH,
        height: MAP_HEIGHT,
        border: 0
      },
      map: {
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
      },
      divHeight: {
        style: {}
      }
    })

    canvas.draw(OBJECT_PLAYER, [[0, 0]])
    expect(contextGame.popCall()).toEqual({
      'args': [0, 0, 20, 20],
      'methodName': 'fillRect',
      'props': {
        'canvas': {
          'height': CANVAS_HEIGHT,
          'width': CANVAS_WIDTH,
          'style': { left: '0px', top: '0px' }
        },
        'fillStyle': COLOR_PLAYER,
        'strokeStyle': '#000'
      }
    })
  })

  it('canvas draws walls to walls context', () => {
    const contextGame = new CanvasRenderingContext2DMock(CANVAS_WIDTH, CANVAS_HEIGHT)
    const canvas = new Canvas({
      contexts: {
        contextGame
      },
      grid: {
        dot: DOT_SIZE,
        line: LINE_SIZE,
        width: MAP_WIDTH,
        height: MAP_HEIGHT,
        border: 0
      },
      map: {
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
      },
      divHeight: {
        style: {}
      }
    })

    canvas.draw(OBJECT_WATERMELON, [[0, 0]])
    expect(contextGame.popCall()).toEqual({
      'args': [0, 0, 20, 20],
      'methodName': 'fillRect',
      'props': {
        'canvas': {
          'height': CANVAS_HEIGHT,
          'width': CANVAS_WIDTH,
          'style': { left: '0px', top: '0px' }
        },
        'fillStyle': COLOR_WATERMELON,
        'strokeStyle': '#000'
      }
    })
  })
})
