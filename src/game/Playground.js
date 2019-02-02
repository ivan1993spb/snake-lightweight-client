import _ from 'lodash'
import log from 'loglevel'

import {
  OBJECT_PLAYER,
  OBJECT_SNAKE,
  OBJECT_APPLE,
  OBJECT_CORPSE,
  OBJECT_WATERMELON,
  OBJECT_WALL
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
    this._canvas.clearAll()

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
      } else if (food.type === OBJECT_WATERMELON) {
        this._canvas.draw(OBJECT_WATERMELON, food.dots)
      }
    })

    this._cacheWalls.forEach(wall => {
      this._canvas.draw(OBJECT_WALL, wall.dots)
    })
  }

  handleGameEvent (type, payload) {
    if (type === GAME_EVENT_TYPE_UPDATE) {
      if (!this._updateObject(payload)) {
        log.error('cannot update object', payload)
      }
      return
    }
    if (type === GAME_EVENT_TYPE_DELETE) {
      if (!this._deleteObject(payload)) {
        log.error('cannot delete object', payload)
      }
      return
    }
    if (type === GAME_EVENT_TYPE_CREATE) {
      if (!this._createObject(payload)) {
        log.error('cannot create object', payload)
      }
      return
    }

    log.error('invalid object manipulation type', type)
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
        log.error('error cannot create object of invalid type:', object.type)
        return false
    }

    return true
  }

  _updateObject (object) {
    switch (object.type) {
      case OBJECT_TYPE_SNAKE:
        const snake = this._cacheSnakes.get(object.uuid)
        if (snake) {
          const { clear, draw } = dotListsDifference(object.dots, snake.dots)
          if (this._snake === object.uuid) {
            this._canvas.draw(OBJECT_PLAYER, draw)
            this._canvas.clear(OBJECT_PLAYER, clear)
          } else {
            this._canvas.draw(OBJECT_SNAKE, draw)
            this._canvas.clear(OBJECT_SNAKE, clear)
          }
          this._cacheSnakes.set(object.uuid, object)
          return true
        } else {
          log.error('snake to update not found')
        }
        break
      case OBJECT_TYPE_APPLE:
        // Cannot update apple.
        log.error('cannot update apple')
        break
      case OBJECT_TYPE_CORPSE:
        const corpse = this._cacheFood.get(object.uuid)
        if (corpse) {
          const { clear, draw } = dotListsDifference(object.dots, corpse.dots)
          this._canvas.draw(OBJECT_CORPSE, draw)
          this._canvas.clear(OBJECT_CORPSE, clear)
          this._cacheFood.set(object.uuid, object)
          return true
        } else {
          log.error('corpse to update not found')
        }
        break
      case OBJECT_TYPE_WATERMELON:
        const watermelon = this._cacheFood.get(object.uuid)
        if (watermelon) {
          const { clear, draw } = dotListsDifference(object.dots, watermelon.dots)
          this._canvas.draw(OBJECT_WATERMELON, draw)
          this._canvas.clear(OBJECT_WATERMELON, clear)
          this._cacheFood.set(object.uuid, object)
          return true
        } else {
          log.error('watermelon to update not found')
        }
        break
      case OBJECT_TYPE_WALL:
        // Nothing to do here.
        log.error('cannot update wall')
        break
      default:
        log.error('error cannot update object of invalid type:', object.type)
    }

    return false
  }

  _deleteObject (object) {
    // Objects to be deleted might be without any location.
    switch (object.type) {
      case OBJECT_TYPE_SNAKE:
        this._canvas.clear(OBJECT_SNAKE, object.dots)
        return this._cacheSnakes.delete(object.uuid)
      case OBJECT_TYPE_APPLE:
        this._canvas.clear(OBJECT_APPLE, [object.dot])
        return this._cacheFood.delete(object.uuid)
      case OBJECT_TYPE_CORPSE:
        const corpse = this._cacheFood.get(object.uuid)
        if (corpse) {
          this._canvas.clear(OBJECT_CORPSE, corpse.dots)
          return this._cacheFood.delete(object.uuid)
        }
        return false
      case OBJECT_TYPE_WATERMELON:
        const watermelon = this._cacheFood.get(object.uuid)
        if (watermelon) {
          this._canvas.clear(OBJECT_WATERMELON, watermelon.dots)
          return this._cacheFood.delete(object.uuid)
        }
        return false
      case OBJECT_TYPE_WALL:
        const wall = this._cacheWalls.get(object.uuid)
        if (wall) {
          this._canvas.clear(OBJECT_WALL, wall.dots)
          return this._cacheWalls.delete(object.uuid)
        }
        return false
      default:
        log.error('error cannot delete object of invalid type:', object.type)
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
