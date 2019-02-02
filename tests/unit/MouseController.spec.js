import MouseController from '@/game/MouseController'

const DIRECTION_NORTH = 0
const DIRECTION_EAST = 1
const DIRECTION_WEST = 2
const DIRECTION_SOUTH = 3

describe('MouseController test north', () => {
  it('Simple square map find north', () => {
    const controller = new MouseController({
      x: 0,
      y: 0,
      width: 3,
      height: 3
    })
    expect(controller._calc(1, 0)).toBe(DIRECTION_NORTH)
  })

  it('Simple rect map find north', () => {
    const controller = new MouseController({
      x: 0,
      y: 0,
      width: 30,
      height: 3
    })
    expect(controller._calc(15, 0)).toBe(DIRECTION_NORTH)
  })

  it('Moved square map find north', () => {
    const controller = new MouseController({
      x: 100,
      y: 400,
      width: 3,
      height: 3
    })
    expect(controller._calc(101, 400)).toBe(DIRECTION_NORTH)
  })

  it('Moved rect map find north', () => {
    const controller = new MouseController({
      x: 100,
      y: 400,
      width: 3000,
      height: 500
    })
    expect(controller._calc(1550, 500)).toBe(DIRECTION_NORTH)
  })
})

describe('MouseController test west', () => {
  it('Simple square map find west', () => {
    const controller = new MouseController({
      x: 0,
      y: 0,
      width: 3,
      height: 3
    })
    expect(controller._calc(0, 1)).toBe(DIRECTION_WEST)
  })

  it('Simple rect map find west', () => {
    const controller = new MouseController({
      x: 0,
      y: 0,
      width: 30,
      height: 3
    })
    expect(controller._calc(0, 1)).toBe(DIRECTION_WEST)
  })

  it('Moved square map find west', () => {
    const controller = new MouseController({
      x: 100,
      y: 400,
      width: 3,
      height: 3
    })
    expect(controller._calc(100, 401)).toBe(DIRECTION_WEST)
  })

  it('Moved rect map find west', () => {
    const controller = new MouseController({
      x: 100,
      y: 400,
      width: 3000,
      height: 500
    })
    expect(controller._calc(100, 650)).toBe(DIRECTION_WEST)
  })
})

describe('MouseController test south', () => {
  it('Simple square map find south', () => {
    const controller = new MouseController({
      x: 0,
      y: 0,
      width: 3,
      height: 3
    })
    expect(controller._calc(1, 2)).toBe(DIRECTION_SOUTH)
  })

  it('Simple rect map find south', () => {
    const controller = new MouseController({
      x: 0,
      y: 0,
      width: 30,
      height: 3
    })
    expect(controller._calc(15, 2)).toBe(DIRECTION_SOUTH)
  })

  it('Moved square map find south', () => {
    const controller = new MouseController({
      x: 100,
      y: 400,
      width: 3,
      height: 3
    })
    expect(controller._calc(101, 402)).toBe(DIRECTION_SOUTH)
  })

  it('Moved rect map find south', () => {
    const controller = new MouseController({
      x: 100,
      y: 400,
      width: 3200,
      height: 500
    })
    expect(controller._calc(1700, 650)).toBe(DIRECTION_SOUTH)
  })
})

describe('MouseController test east', () => {
  it('Simple square map find east', () => {
    const controller = new MouseController({
      x: 0,
      y: 0,
      width: 3,
      height: 3
    })
    expect(controller._calc(2, 1)).toBe(DIRECTION_EAST)
  })

  it('Simple rect map find east', () => {
    const controller = new MouseController({
      x: 0,
      y: 0,
      width: 30,
      height: 3
    })
    expect(controller._calc(29, 1)).toBe(DIRECTION_EAST)
  })

  it('Moved square map find east', () => {
    const controller = new MouseController({
      x: 100,
      y: 400,
      width: 3,
      height: 3
    })
    expect(controller._calc(102, 401)).toBe(DIRECTION_EAST)
  })

  it('Moved rect map find east', () => {
    const controller = new MouseController({
      x: 100,
      y: 400,
      width: 3200,
      height: 500
    })
    expect(controller._calc(3299, 650)).toBe(DIRECTION_EAST)
  })
})
