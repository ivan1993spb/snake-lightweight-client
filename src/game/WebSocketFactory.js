
export class WebSocketFactory {
  constructor (wsClassName, ...args) {
    this._wsClassName = wsClassName
    this._args = args
  }

  create () {
    return new this._wsClassName(...this._args)
  }
}

export default WebSocketFactory
