
import BaseDeviceController from './BaseDeviceController'

const MOUSE_BUTTON = 1
const LISTEN_TO_EVENT_MOUSE = 'mousedown'

export class MouseController extends BaseDeviceController {
  constructor (screenSettings) {
    super(screenSettings, LISTEN_TO_EVENT_MOUSE)

    this._listener = event => {
      if (event.buttons === MOUSE_BUTTON) {
        this._turnCommandByDot(event.pageX, event.pageY)
      }
    }
  }
}

export default MouseController
