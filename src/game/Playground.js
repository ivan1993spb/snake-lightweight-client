import _ from 'lodash'
import log from 'loglevel'

import {
  OBJECT_APPLE,
  OBJECT_CORPSE,
  OBJECT_PLAYER,
  OBJECT_SNAKE,
  OBJECT_WALL,
  OBJECT_WATERMELON,
  OBJECT_HIGHLIGHTED,
  OBJECT_MOUSE,
  OBJECT_UNKNOWN
} from './Canvas'

const OBJECT_TYPE_SNAKE = 'snake'
const OBJECT_TYPE_APPLE = 'apple'
const OBJECT_TYPE_CORPSE = 'corpse'
const OBJECT_TYPE_WATERMELON = 'watermelon'
const OBJECT_TYPE_WALL = 'wall'
const OBJECT_TYPE_MOUSE = 'mouse'

const GAME_EVENT_TYPE_CREATE = 'create'
const GAME_EVENT_TYPE_UPDATE = 'update'
const GAME_EVENT_TYPE_DELETE = 'delete'

const HIGHLIGHT_PLAYER_SNAKE_INTERVAL = 100
const HIGHLIGHT_PLAYER_SNAKE_TIMEOUT = 5000

const X = 0
const Y = 1

function dotsEqual (first, second) {
  return first[X] === second[X] && first[Y] === second[Y]
}

function dotListsDifference (firstDots, secondDots) {
  return {
    draw: _.differenceWith(firstDots, secondDots, dotsEqual),
    clear: _.differenceWith(secondDots, firstDots, dotsEqual)
  }
}

class HandleGameEventError extends Error {
  constructor (eventType, e = undefined) {
    super(`cannot handle game event ${eventType}`)
    if (e) {
      this.cause = e
    }
  }
}

export class Playground {
  constructor (canvas) {
    this._canvas = canvas

    // Player's snake id
    this._snakeID = null

    this._initCaches()
  }

  setPlayerSnake (snakeID) {
    this._snakeID = snakeID
    this._highlightPlayerSnakeInit()
  }

  _highlightPlayerSnakeInit () {
    this._highlightCounter = 0
    this._highlightPlayerSnakeInterval = setInterval(() => {
      this._highlightPlayerSnakeIter()
    }, HIGHLIGHT_PLAYER_SNAKE_INTERVAL)
  }

  _highlightPlayerSnakeIter () {
    try {
      this._highlightPlayerSnake()
    } catch (e) {
      this._highlightPlayerSnakeStop()
      log.error('highlighting was interrupted:', e)

      try {
        this._highlightPlayerSnakeReturnOriginalColor()
      } catch (e) {
        log.error('cannot return original snake color', e)
      }
    }
  }

  _highlightPlayerSnakeStop () {
    clearInterval(this._highlightPlayerSnakeInterval)
    this._highlightCounter = 0
  }

  _highlightPlayerSnakeTimeout () {
    return HIGHLIGHT_PLAYER_SNAKE_TIMEOUT <=
      HIGHLIGHT_PLAYER_SNAKE_INTERVAL * this._highlightCounter
  }

  _highlightPlayerSnake () {
    if (this._highlightPlayerSnakeTimeout()) {
      throw new Error('cannot highlight snake: highlighting time is out')
    }

    this._highlightCounter++

    try {
      this._paintPlayerSnake(this._highlightPlayerSnakeObjectType())
    } catch (e) {
      throw new Error('cannot highlight snake:', e)
    }
  }

  _highlightPlayerSnakeObjectType () {
    // eslint-disable-next-line
    return this._highlightCounter & 1 === 1 ? OBJECT_PLAYER : OBJECT_HIGHLIGHTED
  }

  _highlightPlayerSnakeIsActive () {
    return this._highlightCounter > 0
  }

  _highlightPlayerSnakeReturnOriginalColor () {
    // Return original player's snake color
    try {
      this._paintPlayerSnake(OBJECT_PLAYER)
    } catch (e) {
      throw new Error('return original snake color:', e)
    }
  }

  _paintPlayerSnake (objectType) {
    if (!this._snakeID) {
      throw new Error('cannot paint player snake: id is empty')
    }

    const snake = this._cacheSnakes.get(this._snakeID)
    if (snake === undefined) {
      throw new Error(`cannot paint player snake: snake was not found id=${this._snakeID}`)
    }

    this._canvas.draw(objectType, snake.dots)
  }

  loadObjects (objects) {
    if (objects instanceof Array) {
      objects.forEach(object => {
        try {
          this._createObject(object)
        } catch (error) {
          log.error('loading object error:', error, object)
        }
      })
    }
  }

  redrawFromCaches () {
    this._cacheSnakes.forEach(snake => {
      if (this._snakeID === snake.id) {
        if (this._highlightPlayerSnakeIsActive()) {
          this._canvas.draw(this._highlightPlayerSnakeObjectType(), snake.dots)
        } else {
          this._canvas.draw(OBJECT_PLAYER, snake.dots)
        }
      } else {
        this._canvas.draw(OBJECT_SNAKE, snake.dots)
      }
    })

    this._cacheFood.forEach(food => {
      if (food.type === OBJECT_TYPE_APPLE) {
        this._canvas.draw(OBJECT_APPLE, [food.dot])
      } else if (food.type === OBJECT_TYPE_CORPSE) {
        this._canvas.draw(OBJECT_CORPSE, food.dots)
      } else if (food.type === OBJECT_TYPE_WATERMELON) {
        this._canvas.draw(OBJECT_WATERMELON, food.dots)
      } else if (food.type === OBJECT_TYPE_MOUSE) {
        this._canvas.draw(OBJECT_MOUSE, [food.dot])
      } else {
        // Unknown object
        if (_.has(food, 'dots')) {
          this._canvas.draw(OBJECT_UNKNOWN, food.dots)
        } else if (_.has(food, 'dot')) {
          this._canvas.draw(OBJECT_UNKNOWN, [food.dot])
        }
      }
    })

    this._cacheWalls.forEach(wall => {
      this._canvas.draw(OBJECT_WALL, wall.dots)
    })
  }

  handleGameEvent (type, payload) {
    if (type === GAME_EVENT_TYPE_UPDATE) {
      try {
        this._updateObject(payload)
      } catch (e) {
        throw new HandleGameEventError(type, e)
      }
      return
    }

    if (type === GAME_EVENT_TYPE_DELETE) {
      try {
        this._deleteObject(payload)
      } catch (e) {
        throw new HandleGameEventError(type, e)
      }
      return
    }

    if (type === GAME_EVENT_TYPE_CREATE) {
      try {
        this._createObject(payload)
      } catch (e) {
        throw new HandleGameEventError(type, e)
      }
      return
    }

    throw new HandleGameEventError(`invalid game event type: ${type}`)
  }

  _createObject (object) {
    switch (object.type) {
      case OBJECT_TYPE_SNAKE:
        if (this._snakeID === object.id) {
          if (this._highlightPlayerSnakeIsActive()) {
            this._canvas.draw(this._highlightPlayerSnakeObjectType(), object.dots)
          } else {
            this._canvas.draw(OBJECT_PLAYER, object.dots)
          }
        } else {
          this._canvas.draw(OBJECT_SNAKE, object.dots)
        }
        this._cacheSnakes.set(object.id, object)
        break
      case OBJECT_TYPE_APPLE:
        this._canvas.draw(OBJECT_APPLE, [object.dot])
        this._cacheFood.set(object.id, object)
        break
      case OBJECT_TYPE_CORPSE:
        this._canvas.draw(OBJECT_CORPSE, object.dots)
        this._cacheFood.set(object.id, object)
        break
      case OBJECT_TYPE_WATERMELON:
        this._canvas.draw(OBJECT_WATERMELON, object.dots)
        this._cacheFood.set(object.id, object)
        break
      case OBJECT_TYPE_WALL:
        this._canvas.draw(OBJECT_WALL, object.dots)
        this._cacheWalls.set(object.id, object)
        break
      case OBJECT_TYPE_MOUSE:
        this._canvas.draw(OBJECT_MOUSE, [object.dot])
        this._cacheFood.set(object.id, object)
        break
      default:
        // Add all unknown objects to the cache map for food
        if (_.has(object, 'dots')) {
          this._canvas.draw(OBJECT_UNKNOWN, object.dots)
        } else if (_.has(object, 'dot')) {
          this._canvas.draw(OBJECT_UNKNOWN, [object.dot])
        } else {
          throw new Error(`Playground: object of unknown type does not have dot/dots field: ${object.type}`)
        }
        this._cacheFood.set(object.id, object)
    }
  }

  _updateObject (object) {
    switch (object.type) {
      case OBJECT_TYPE_SNAKE: {
        const snake = this._cacheSnakes.get(object.id)
        if (snake === undefined) {
          throw new Error(`Playground: snake to update was not found: ${object.id}`)
        }
        const { clear, draw } = dotListsDifference(object.dots, snake.dots)
        if (this._snakeID === object.id) {
          if (this._highlightPlayerSnakeIsActive()) {
            const objectType = this._highlightPlayerSnakeObjectType()
            this._canvas.draw(objectType, draw)
            this._canvas.clear(objectType, clear)
          } else {
            this._canvas.draw(OBJECT_PLAYER, draw)
            this._canvas.clear(OBJECT_PLAYER, clear)
          }
        } else {
          this._canvas.draw(OBJECT_SNAKE, draw)
          this._canvas.clear(OBJECT_SNAKE, clear)
        }
        this._cacheSnakes.set(object.id, object)
        break
      }
      case OBJECT_TYPE_APPLE: {
        // Cannot update apple.
        throw new Error('Playground: cannot update apple')
      }
      case OBJECT_TYPE_CORPSE: {
        const corpse = this._cacheFood.get(object.id)
        if (corpse === undefined) {
          throw new Error(`Playground: corpse to update was not found: ${object.id}`)
        }
        const { clear, draw } = dotListsDifference(object.dots, corpse.dots)
        this._canvas.draw(OBJECT_CORPSE, draw)
        this._canvas.clear(OBJECT_CORPSE, clear)
        this._cacheFood.set(object.id, object)
        break
      }
      case OBJECT_TYPE_WATERMELON: {
        const watermelon = this._cacheFood.get(object.id)
        if (watermelon === undefined) {
          throw new Error(`Playground: watermelon to update was not found: ${object.id}`)
        }
        const { clear, draw } = dotListsDifference(object.dots, watermelon.dots)
        this._canvas.draw(OBJECT_WATERMELON, draw)
        this._canvas.clear(OBJECT_WATERMELON, clear)
        this._cacheFood.set(object.id, object)
        break
      }
      case OBJECT_TYPE_MOUSE: {
        const mouse = this._cacheFood.get(object.id)
        if (mouse === undefined) {
          throw new Error(`Playground: mouse to update was not found: ${object.id}`)
        }
        this._canvas.draw(OBJECT_MOUSE, [object.dot])
        this._canvas.clear(OBJECT_MOUSE, [mouse.dot])
        this._cacheFood.set(object.id, object)
        break
      }
      case OBJECT_TYPE_WALL: {
        const wall = this._cacheWalls.get(object.id)
        if (wall === undefined) {
          throw new Error(`Playground: wall to update was not found: ${object.id}`)
        }
        const { clear, draw } = dotListsDifference(object.dots, wall.dots)
        this._canvas.draw(OBJECT_WALL, draw)
        this._canvas.clear(OBJECT_WALL, clear)
        this._cacheWalls.set(object.id, object)
        break
      }
      default: {
        // All unknown objects are stored in the cache map for food
        const unknown = this._cacheFood.get(object.id)
        if (unknown === undefined) {
          throw new Error(`Playground: unknown object to be updated was not found: ${object.id}`)
        }

        if (_.has(object, 'dots')) {
          const { clear, draw } = dotListsDifference(object.dots, unknown.dots)
          this._canvas.draw(OBJECT_UNKNOWN, draw)
          this._canvas.clear(OBJECT_UNKNOWN, clear)
        } else if (_.has(object, 'dot')) {
          if (!dotsEqual(object.dot, unknown.dot)) {
            this._canvas.draw(OBJECT_UNKNOWN, [object.dot])
            this._canvas.clear(OBJECT_UNKNOWN, [unknown.dot])
          }
        } else {
          throw new Error(`Playground: object of unknown type does not have dot/dots field: ${object.type}`)
        }

        this._cacheFood.set(object.id, object)
      }
    }
  }

  _deleteObject (object) {
    // Objects to be deleted might be without any location.
    switch (object.type) {
      case OBJECT_TYPE_SNAKE:
        if (!this._cacheSnakes.delete(object.id)) {
          throw new Error(`Playground: snake object to delete was not found: ${object.id}`)
        }
        this._canvas.clear(OBJECT_SNAKE, object.dots)
        break
      case OBJECT_TYPE_APPLE:
        if (!this._cacheFood.delete(object.id)) {
          throw new Error(`Playground: apple object to delete was not found: ${object.id}`)
        }
        this._canvas.clear(OBJECT_APPLE, [object.dot])
        break
      case OBJECT_TYPE_CORPSE: {
        const corpse = this._cacheFood.get(object.id)
        if (corpse === undefined) {
          throw new Error(`Playground: corpse object to delete was not found: ${object.id}`)
        }
        this._canvas.clear(OBJECT_CORPSE, corpse.dots)
        this._cacheFood.delete(object.id)
        break
      }
      case OBJECT_TYPE_WATERMELON: {
        const watermelon = this._cacheFood.get(object.id)
        if (watermelon === undefined) {
          throw new Error(`Playground: watermelon object to delete was not found: ${object.id}`)
        }
        this._canvas.clear(OBJECT_WATERMELON, watermelon.dots)
        this._cacheFood.delete(object.id)
        break
      }
      case OBJECT_TYPE_WALL: {
        const wall = this._cacheWalls.get(object.id)
        if (wall === undefined) {
          throw new Error(`Playground: wall object to delete was not found: ${object.id}`)
        }
        this._canvas.clear(OBJECT_WALL, wall.dots)
        this._cacheWalls.delete(object.id)
        break
      }
      case OBJECT_TYPE_MOUSE: {
        const mouse = this._cacheFood.get(object.id)
        if (mouse === undefined) {
          throw new Error(`Playground: mouse object to delete was not found: ${object.id}`)
        }
        this._canvas.clear(OBJECT_MOUSE, [mouse.dot])
        this._cacheFood.delete(object.id)
        break
      }
      default:
        // All unknown objects are stored in the cache map for food
        const unknown = this._cacheFood.get(object.id)
        if (unknown === undefined) {
          throw new Error(`Playground: unknown object to be deleted was not found: ${object.id}`)
        }

        if (_.has(object, 'dots')) {
          this._canvas.clear(OBJECT_UNKNOWN, unknown.dots)
        } else if (_.has(object, 'dot')) {
          this._canvas.clear(OBJECT_UNKNOWN, [unknown.dot])
        } else {
          throw new Error(`Playground: object of unknown type does not have dot/dots field: ${object.type}`)
        }

        this._cacheFood.delete(object.id)
    }
  }

  _initCaches () {
    this._cacheSnakes = new Map()
    this._cacheFood = new Map()
    this._cacheWalls = new Map()
  }

  _clearCaches () {
    this._cacheSnakes.clear()
    this._cacheFood.clear()
    this._cacheWalls.clear()
  }

  start () {
  }

  stop () {
    this._clearCaches()
    this._highlightPlayerSnakeStop()
  }
}

export default Playground
