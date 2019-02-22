import clone from 'clone'
import _ from 'lodash'

export class CanvasRenderingContext2DMock {
  constructor (width = 0, height = 0) {
    this._calls = []
    this._initProps({
      fillStyle: '#000',
      strokeStyle: '#000',
      canvas: {
        style: {
          left: '0px',
          top: '0px'
        },
        width,
        height
      }
    })
    this._initMethods([
      'clearRect',
      'fillRect',
      'strokeRect',
      'fillText',
      'strokeText',
      'measureText',
      'moveTo',
      'lineTo',
      'closePath',
      'stroke'
    ])
  }

  _initProps (props) {
    this._propsToTrack = []

    _.forEach(props, (defaultValue, propName) => {
      this._propsToTrack.push(propName)
      this[propName] = defaultValue
    })
  }

  _initMethods (methods) {
    methods.forEach(methodName => {
      this[methodName] = (...args) => {
        this._record(methodName, args, this.getProps())
      }
    })
  }

  getProps () {
    const props = {}

    this._propsToTrack.forEach(propName => {
      props[propName] = clone(this[propName])
    })

    return props
  }

  _record (methodName, args, props) {
    this._calls.push({
      methodName,
      args,
      props
    })
  }

  flushCalls () {
    this._calls = []
  }

  getCalls () {
    return this._calls
  }

  popCall () {
    return this._calls.pop()
  }
}

export default CanvasRenderingContext2DMock
