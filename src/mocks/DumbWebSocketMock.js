
import BaseWebSocketMock from './BaseWebSocketMock'

export class DumbWebSocketMock extends BaseWebSocketMock {
  receive (message) {
    this.onmessage(message)
  }
}

export default DumbWebSocketMock
