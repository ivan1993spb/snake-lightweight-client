
import Core from './Core'

export default Core

// Server messages:
// - game
//   * error - payload=string - log to console
//   * create - payload=object - draw on canvas
//   * delete - payload=object - draw on canvas
//   * update - payload=object - draw on canvas
//   * checked - payload=object (disabled) - ignore
// - player
//   * size - payload=object - resize map
//   * snake - payload=string - draw on canvas
//   * notice - payload=string - player notification bar
//   * error - payload=string - player notification bar
//   * countdown - payload=number - countdown bar
//   * objects - payload=object - draw on canvas
// - broadcast - payload=string - player notification bar
//
// Output methods:
// - log to console
// - draw on canvas
// - player notification bar
// - countdown bar
// - ignoring

// # TODO:
// class:
// * ScreenSizeController.js
// view:
// * player notification bar
// * countdown bar
