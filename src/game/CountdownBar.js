
export class CountdownBar {
  constructor ({ element, map }) {
    this._element = element

    this.setScreen(map)
  }

  setScreen ({ x, y, width, height }) {
    this._x = x
    this._y = y
    this._width = width
    this._height = height
  }

  activateCountdown (countdown) {

  }
}

export default CountdownBar
