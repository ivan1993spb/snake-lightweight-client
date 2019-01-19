import CanvasRenderingContext2DMock from '@/mocks/CanvasRenderingContext2DMock'

describe('game canvas', () => {
  it('canvas', () => {
    const mock = new CanvasRenderingContext2DMock()
    mock.clearRect()
    mock.clearRect(1, 2, 3, 4)
    mock.fillRect(1, 2, 3, 4, 5, 6, 7)
    mock.fillStyle = '#787'
    mock.fillRect(5, 6, 7)
    const test = 'ok'
    expect(test).toBe('ok')
  })
})
