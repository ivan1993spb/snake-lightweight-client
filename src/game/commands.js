
// Commands to send to the game server:

// Command north sets snake direction to the north
export const COMMAND_NORTH = JSON.stringify({
  type: 'snake',
  payload: 'north'
})
// Command east sets snake direction to the east
export const COMMAND_EAST = JSON.stringify({
  type: 'snake',
  payload: 'east'
})
// Command south sets snake direction to the south
export const COMMAND_SOUTH = JSON.stringify({
  type: 'snake',
  payload: 'south'
})
// Command west sets snake direction to the west
export const COMMAND_WEST = JSON.stringify({
  type: 'snake',
  payload: 'west'
})
