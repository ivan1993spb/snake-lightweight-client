
import BaseDeviceController from './BaseDeviceController'

const FIRST_TOUCH = 0
const LISTEN_TO_EVENT_TOUCH = 'touchstart'

export class TouchController extends BaseDeviceController {
  constructor (screenSettings) {
    super(screenSettings, LISTEN_TO_EVENT_TOUCH)

    this._listener = event => {
      const pageX = event.changedTouches[FIRST_TOUCH].pageX
      const pageY = event.changedTouches[FIRST_TOUCH].pageY

      this._turnCommandByDot(pageX, pageY)
    }
  }
}

export default TouchController
