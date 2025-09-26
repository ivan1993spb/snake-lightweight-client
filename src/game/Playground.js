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
const GAME_EVENT_TYPE_UPDATE_V2 = 'update_v2'
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

function removeLastDotMatch (dots, dot) {
  for (let i = dots.length - 1; i >= 0; i--) {
    if (dotsEqual(dots[i], dot)) {
      dots.splice(i, 1)
      return true
    }
  }
  return false
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

    this._initCache()
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

    const snake = this._cache.get(this._snakeID)
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

  _snakeObjectColor(object) {
    if (this._snakeID !== object.id) {
      // Someone else's snake
      return OBJECT_SNAKE
    }
    if (this._highlightPlayerSnakeIsActive()) {
      // Our snake is highlighted
      return this._highlightPlayerSnakeObjectType()
    }
    // Our snake is not highlighted
    return OBJECT_PLAYER
  }

  _objectColor(object) {
    switch (object.type) {
      case OBJECT_TYPE_SNAKE:
        return this._snakeObjectColor(object)
      case OBJECT_TYPE_APPLE:
        return OBJECT_APPLE
      case OBJECT_TYPE_CORPSE:
        return OBJECT_CORPSE
      case OBJECT_TYPE_WATERMELON:
        return OBJECT_WATERMELON
      case OBJECT_TYPE_WALL:
        return OBJECT_WALL
      case OBJECT_TYPE_MOUSE:
        return OBJECT_MOUSE
      default:
        return OBJECT_UNKNOWN
    }
  }

  redrawFromCache () {
    this._cache.forEach(object => {
      const dots = object.dots || (object.dot ? [object.dot] : [])
      this._canvas.draw(this._objectColor(object), dots)
    })
  }

  handleGameEvent (type, payload) {
    try {
      switch (type) {
        case GAME_EVENT_TYPE_CREATE:
          this._createObject(payload)
          break
        case GAME_EVENT_TYPE_UPDATE:
          this._updateObject(payload)
          break
        case GAME_EVENT_TYPE_UPDATE_V2:
          this._updateObjectV2(payload)
          break
        case GAME_EVENT_TYPE_DELETE:
          this._deleteObject(payload)
          break
        default:
          throw new Error(`invalid game event type: ${type}`)
      }
    } catch (e) {
      throw new HandleGameEventError(type, e)
    }
  }

  _createObject (object) {
    const dots = object.dots || (object.dot ? [object.dot] : [])
    if (dots.length === 0) {
      throw new Error(`Playground: object to create does not have dot/dots field: ${object.type}`)
    }
    this._cache.set(object.id, object)
    this._canvas.draw(this._objectColor(object), dots)
  }

  _updateObject (updatedObject) {
    const existing = this._cache.get(updatedObject.id)
    if (existing === undefined) {
      throw new Error(`Playground: object to update was not found in cache: ${updatedObject.id}`)
    }
    const newDots = updatedObject.dots || (updatedObject.dot ? [updatedObject.dot] : [])
    const existingDots = existing.dots || (existing.dot ? [existing.dot] : [])
    const { clear, draw } = dotListsDifference(newDots, existingDots)
    this._canvas.draw(this._objectColor(updatedObject), draw)
    this._canvas.clear(clear)
    this._cache.set(updatedObject.id, updatedObject)
  }

  _updateObjectV2 (update) {
    const object = this._cache.get(update.id)
    if (object === undefined) {
      throw new Error(`Playground: object to update was not found in cache: ${update.id}`)
    }
    if (object.type === OBJECT_TYPE_SNAKE && _.has(update, 'add')) {
      object.dots.unshift(update.add)
      this._canvas.drawDot(this._snakeObjectColor(object), update.add)
    } else if (object.type === OBJECT_TYPE_MOUSE && _.has(update, 'dot')) {
      this._canvas.drawDot(OBJECT_MOUSE, update.dot)
      this._canvas.clearDot(object.dot)
      object.dot = update.dot
    }
    if (_.has(update, 'del')) {
      if (removeLastDotMatch(object.dots, update.del)) {
        this._canvas.clearDot(update.del)
      }
    }
  }

  _deleteObject (object) {
    // Objects to be deleted might be without any dots!
    const existing = this._cache.get(object.id)
    if (existing === undefined) {
      throw new Error(`Playground: object to delete was not found in cache: ${object.id}`)
    }
    let dots = existing.dots || (existing.dot ? [existing.dot] : [])
    if (object.type === OBJECT_TYPE_SNAKE) {
      dots = object.dots || dots
    }
    if (dots.length > 0) {
      this._canvas.clear(dots)
    }
    this._cache.delete(object.id)
  }

  _initCache () {
    this._cache = new Map()
  }

  _clearCache () {
    this._cache.clear()
  }

  start () {
  }

  stop () {
    this._clearCache()
    this._highlightPlayerSnakeStop()
  }
}

export default Playground
