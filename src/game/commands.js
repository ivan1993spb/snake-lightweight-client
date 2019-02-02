
// Output message types:
const OUTPUT_MESSAGE_TYPE_SNAKE = 'snake'

// Direction labels:
const DIRECTION_LABEL_NORTH = 'north'
const DIRECTION_LABEL_EAST = 'east'
const DIRECTION_LABEL_SOUTH = 'south'
const DIRECTION_LABEL_WEST = 'west'

// Commands to send to the game server:

// Command north sets snake direction to the north
export const COMMAND_NORTH = JSON.stringify({
  type: OUTPUT_MESSAGE_TYPE_SNAKE,
  payload: DIRECTION_LABEL_NORTH
})
// Command east sets snake direction to the east
export const COMMAND_EAST = JSON.stringify({
  type: OUTPUT_MESSAGE_TYPE_SNAKE,
  payload: DIRECTION_LABEL_EAST
})
// Command south sets snake direction to the south
export const COMMAND_SOUTH = JSON.stringify({
  type: OUTPUT_MESSAGE_TYPE_SNAKE,
  payload: DIRECTION_LABEL_SOUTH
})
// Command west sets snake direction to the west
export const COMMAND_WEST = JSON.stringify({
  type: OUTPUT_MESSAGE_TYPE_SNAKE,
  payload: DIRECTION_LABEL_WEST
})
