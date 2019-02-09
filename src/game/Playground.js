import _ from 'lodash'
import log from 'loglevel'

import {
  OBJECT_APPLE,
  OBJECT_CORPSE,
  OBJECT_PLAYER,
  OBJECT_SNAKE,
  OBJECT_WALL,
  OBJECT_WATERMELON
} from './Canvas'

const OBJECT_TYPE_SNAKE = 'snake'
const OBJECT_TYPE_APPLE = 'apple'
const OBJECT_TYPE_CORPSE = 'corpse'
const OBJECT_TYPE_WATERMELON = 'watermelon'
const OBJECT_TYPE_WALL = 'wall'

const GAME_EVENT_TYPE_CREATE = 'create'
const GAME_EVENT_TYPE_UPDATE = 'update'
const GAME_EVENT_TYPE_DELETE = 'delete'

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

    // Player's snake uuid
    this._snake = ''

    this._initCaches()
  }

  setPlayerSnake (snake) {
    this._snake = snake
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
    // this._canvas.clearAll()

    this._cacheSnakes.forEach(snake => {
      if (this._snake === snake.uuid) {
        this._canvas.draw(OBJECT_PLAYER, snake.dots)
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
        if (this._snake === object.uuid) {
          this._canvas.draw(OBJECT_PLAYER, object.dots)
        } else {
          this._canvas.draw(OBJECT_SNAKE, object.dots)
        }
        this._cacheSnakes.set(object.uuid, object)
        break
      case OBJECT_TYPE_APPLE:
        this._canvas.draw(OBJECT_APPLE, [object.dot])
        this._cacheFood.set(object.uuid, object)
        break
      case OBJECT_TYPE_CORPSE:
        this._canvas.draw(OBJECT_CORPSE, object.dots)
        this._cacheFood.set(object.uuid, object)
        break
      case OBJECT_TYPE_WATERMELON:
        this._canvas.draw(OBJECT_WATERMELON, object.dots)
        this._cacheFood.set(object.uuid, object)
        break
      case OBJECT_TYPE_WALL:
        this._canvas.draw(OBJECT_WALL, object.dots)
        this._cacheWalls.set(object.uuid, object)
        break
      default:
        throw new Error(`Playground: error cannot create object of invalid type: ${object.type}`)
    }
  }

  _updateObject (object) {
    switch (object.type) {
      case OBJECT_TYPE_SNAKE: {
        const snake = this._cacheSnakes.get(object.uuid)
        if (snake === undefined) {
          throw new Error(`Playground: snake to update was not found: ${object.uuid}`)
        }
        const { clear, draw } = dotListsDifference(object.dots, snake.dots)
        if (this._snake === object.uuid) {
          this._canvas.draw(OBJECT_PLAYER, draw)
          this._canvas.clear(OBJECT_PLAYER, clear)
        } else {
          this._canvas.draw(OBJECT_SNAKE, draw)
          this._canvas.clear(OBJECT_SNAKE, clear)
        }
        this._cacheSnakes.set(object.uuid, object)
        break
      }
      case OBJECT_TYPE_APPLE: {
        // Cannot update apple.
        throw new Error('Playground: cannot update apple')
      }
      case OBJECT_TYPE_CORPSE: {
        const corpse = this._cacheFood.get(object.uuid)
        if (corpse === undefined) {
          throw new Error(`Playground: corpse to update was not found: ${object.uuid}`)
        }
        const { clear, draw } = dotListsDifference(object.dots, corpse.dots)
        this._canvas.draw(OBJECT_CORPSE, draw)
        this._canvas.clear(OBJECT_CORPSE, clear)
        this._cacheFood.set(object.uuid, object)
        break
      }
      case OBJECT_TYPE_WATERMELON: {
        const watermelon = this._cacheFood.get(object.uuid)
        if (watermelon === undefined) {
          throw new Error(`Playground: watermelon to update was not found: ${object.uuid}`)
        }
        const { clear, draw } = dotListsDifference(object.dots, watermelon.dots)
        this._canvas.draw(OBJECT_WATERMELON, draw)
        this._canvas.clear(OBJECT_WATERMELON, clear)
        this._cacheFood.set(object.uuid, object)
        break
      }
      case OBJECT_TYPE_WALL: {
        // Nothing to do here.
        throw new Error('Playground: cannot update wall object')
      }
      default: {
        throw new Error(`Playground: error cannot update object of invalid type: ${object.type}`)
      }
    }
  }

  _deleteObject (object) {
    // Objects to be deleted might be without any location.
    switch (object.type) {
      case OBJECT_TYPE_SNAKE:
        if (!this._cacheSnakes.delete(object.uuid)) {
          throw new Error(`Playground: snake object to delete was not found: ${object.uuid}`)
        }
        this._canvas.clear(OBJECT_SNAKE, object.dots)
        break
      case OBJECT_TYPE_APPLE:
        if (!this._cacheFood.delete(object.uuid)) {
          throw new Error(`Playground: apple object to delete was not found: ${object.uuid}`)
        }
        this._canvas.clear(OBJECT_APPLE, [object.dot])
        break
      case OBJECT_TYPE_CORPSE: {
        const corpse = this._cacheFood.get(object.uuid)
        if (corpse === undefined) {
          throw new Error(`Playground: corpse object to delete was not found: ${object.uuid}`)
        }
        this._canvas.clear(OBJECT_CORPSE, corpse.dots)
        this._cacheFood.delete(object.uuid)
        break
      }
      case OBJECT_TYPE_WATERMELON: {
        const watermelon = this._cacheFood.get(object.uuid)
        if (watermelon === undefined) {
          throw new Error(`Playground: watermelon object to delete was not found: ${object.uuid}`)
        }
        this._canvas.clear(OBJECT_WATERMELON, watermelon.dots)
        this._cacheFood.delete(object.uuid)
        break
      }
      case OBJECT_TYPE_WALL: {
        const wall = this._cacheWalls.get(object.uuid)
        if (wall === undefined) {
          throw new Error(`Playground: wall object to delete was not found: ${object.uuid}`)
        }
        this._canvas.clear(OBJECT_WALL, wall.dots)
        this._cacheWalls.delete(object.uuid)
        break
      }
      default:
        throw new Error(`Playground: error cannot delete object of invalid type: ${object.type}`)
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
  }
}

export default Playground
