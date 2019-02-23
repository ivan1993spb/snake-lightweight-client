
const SECOND = 1000

export class CountdownBar {
  constructor ({ element, map }) {
    this._element = element
    this._interval = 0
    this._countdown = 0

    this.setScreen(map)
  }

  setScreen ({ x, y, width, height }) {
    this._x = x
    this._y = y
    this._width = width
    this._height = height

    this._locateElement()
  }

  _locateElement () {
    this._element.style.width = `${this._width}px`
    this._element.style.height = `${this._height}px`
    this._element.style.lineHeight = `${this._height}px`

    this._element.style.left = `${this._x}px`
    this._element.style.top = `${this._y}px`
  }

  activateCountdown (countdown) {
    clearInterval(this._interval)
    this._countdown = countdown

    this._began()

    this._tick()
    this._countdown--

    this._interval = setInterval(() => {
      if (this._countdown > 0) {
        this._tick()
        this._countdown--
      } else {
        this._end()
        clearInterval(this._interval)
      }
    }, SECOND)
  }

  _began () {
    this._element.classList.remove('countdown-bar-inactive')
    this._element.classList.add('countdown-bar-active')
  }

  _tick () {
    this._element.innerText = this._countdown
  }

  _end () {
    this._element.classList.remove('countdown-bar-active')
    this._element.classList.add('countdown-bar-inactive')
  }

  stop () {
    clearInterval(this._interval)
  }
}

export default CountdownBar
