
export class BaseWebSocketMock {
  constructor () {
    this.onmessage = () => {
      throw new Error('method to be triggered is not specified: onmessage')
    }
    this.onclose = () => {
      throw new Error('method to be triggered is not specified: onclose')
    }
    this.onerror = () => {
      throw new Error('method to be triggered is not specified: onerror')
    }
    this.onopen = () => {
      throw new Error('method to be triggered is not specified: onopen')
    }
  }

  close () {
  }

  send (data) {
  }
}

export default BaseWebSocketMock
