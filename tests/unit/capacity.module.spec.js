import capacity from '@/store/capacity.module'

describe('test capacity module getters', () => {
  it('test getter 0.5', () => {
    const state = {
      capacity: 0.5
    }

    const result = capacity.getters.capacity(state)

    expect(result).toBe(0.5)
  })

  it('test getter 0', () => {
    const state = {
      capacity: 0.0
    }

    const result = capacity.getters.capacity(state)

    expect(result).toBe(0.0)
  })
})
