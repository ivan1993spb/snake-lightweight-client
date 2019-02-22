
const loopStart = 20

const messages = [
  { 'type': 'player', 'payload': { 'type': 'notice', 'payload': 'welcome to snake-server!' } },
  { 'type': 'player', 'payload': { 'type': 'size', 'payload': { 'width': 10, 'height': 10 } } },
  { 'type': 'player',
    'payload': { 'type': 'objects',
      'payload': [
        { 'id': 1, 'dots': [[7, 3]], 'type': 'wall' },
        { 'id': 2, 'dots': [[6, 8], [7, 8], [6, 7], [7, 7]], 'type': 'wall' },
        { 'id': 3, 'dots': [[5, 1], [6, 1], [5, 3], [6, 3], [6, 2], [7, 2]], 'type': 'wall' },
        { 'id': 4, 'dots': [[2, 4], [3, 4], [4, 4], [5, 4]], 'type': 'wall' },
        { 'id': 5, 'dot': [6, 6], 'type': 'apple' },
        { 'id': 6, 'dot': [3, 8], 'type': 'apple' }
      ] } },

  // Sample player error
  { 'type': 'player', 'payload': { 'type': 'error', 'payload': 'sample player error' } },

  { 'type': 'player', 'payload': { 'type': 'countdown', 'payload': 5 } },
  { 'type': 'broadcast', 'payload': 'user joined your game group' },
  { 'type': 'player', 'payload': { 'type': 'notice', 'payload': 'start' } },
  { 'type': 'player', 'payload': { 'type': 'error', 'payload': 'cannot create snake' } },
  { 'type': 'player', 'payload': { 'type': 'countdown', 'payload': 5 } },
  { 'type': 'player', 'payload': { 'type': 'notice', 'payload': 'start' } },
  { 'type': 'player', 'payload': { 'type': 'snake', 'payload': 7 } },
  { 'type': 'game', 'payload': { 'type': 'create', 'payload': { 'id': 7, 'dots': [[3, 6], [2, 6], [1, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[4, 6], [3, 6], [2, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[5, 6], [4, 6], [3, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'delete', 'payload': { 'id': 5, 'dot': [6, 6], 'type': 'apple' } } },

  // Sample game error
  { 'type': 'game', 'payload': { 'type': 'error', 'payload': 'sample game error' } },

  { 'type': 'broadcast', 'payload': 'user joined your game group' },
  { 'type': 'game', 'payload': { 'type': 'create', 'payload': { 'id': 8, 'dots': [[7, 9], [6, 9], [5, 9]], 'type': 'snake' } } },

  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[6, 6], [5, 6], [4, 6], [3, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'create', 'payload': { 'id': '0f3140e5-efff-49d0-80f6-e80afb72ece7', 'dot': [3, 3], 'type': 'apple' } } },

  // Snakes movement loop: loopStart
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[7, 6], [6, 6], [5, 6], [4, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 8, 'dots': [[6, 9], [5, 9], [4, 9]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[8, 6], [7, 6], [6, 6], [5, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 8, 'dots': [[5, 9], [4, 9], [3, 9]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[9, 6], [8, 6], [7, 6], [6, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 8, 'dots': [[4, 9], [3, 9], [2, 9]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[0, 6], [9, 6], [8, 6], [7, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 8, 'dots': [[3, 9], [2, 9], [1, 9]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[1, 6], [0, 6], [9, 6], [8, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 8, 'dots': [[2, 9], [1, 9], [0, 9]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[2, 6], [1, 6], [0, 6], [9, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 8, 'dots': [[1, 9], [0, 9], [9, 9]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[3, 6], [2, 6], [1, 6], [0, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 8, 'dots': [[0, 9], [9, 9], [8, 9]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[4, 6], [3, 6], [2, 6], [1, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 8, 'dots': [[9, 9], [8, 9], [7, 9]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[5, 6], [4, 6], [3, 6], [2, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 8, 'dots': [[8, 9], [7, 9], [6, 9]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 7, 'dots': [[6, 6], [5, 6], [4, 6], [3, 6]], 'type': 'snake' } } },
  { 'type': 'game', 'payload': { 'type': 'update', 'payload': { 'id': 8, 'dots': [[7, 9], [6, 9], [5, 9]], 'type': 'snake' } } }
]

export default {
  loopStart,
  messages
}
