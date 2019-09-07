
import Playground from '@/game/Playground'

describe('Playground common methods', () => {
  it('Playground constructor works correctly', () => {
    const canvas = {
      clearAll: jest.fn(),
      draw: jest.fn(),
      clear: jest.fn()
    }

    const pg = new Playground(canvas)

    expect(pg._canvas).toBe(canvas)
    expect(pg._snakeID).toBe(null)

    expect(pg._cacheSnakes).toBeInstanceOf(Map)
    expect(pg._cacheFood).toBeInstanceOf(Map)
    expect(pg._cacheWalls).toBeInstanceOf(Map)
  })

  it('Playground setPlayerSnake sets snake', () => {
    const canvas = {
      clearAll: jest.fn(),
      draw: jest.fn(),
      clear: jest.fn()
    }

    const pg = new Playground(canvas)
    pg.setPlayerSnake(123)
    expect(pg._snakeID).toBe(123)
  })
})
