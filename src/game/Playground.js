import _ from 'lodash'
import log from 'loglevel'

import {
  Canvas,
  OBJECT_PLAYER,
  OBJECT_SNAKE,
  OBJECT_APPLE,
  OBJECT_CORPSE,
  OBJECT_WATERMELON,
  OBJECT_WALL
} from './Canvas'

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
  constructor (canvasSnakes, canvasFood, canvasWalls, canvasGrid, width, height) {
    this._canvas = new Canvas(
      canvasSnakes,
      canvasFood,
      canvasWalls,
      canvasGrid,
      width,
      height
    )

    this._width = width
    this._height = height

    // Player's snake uuid
    this._snake = ''

    this._initStores()
  }

  setPlayerSnake (snake) {
    this._snake = snake
  }

  setSize (width, height) {
    this._width = width
    this._height = height
  }

  loadObjects (objects) {
    if (objects instanceof Array) {
      objects.forEach(object => {
        this._createObject(object)
      })
    }
  }

  handleGameEvent (type, payload) {
    if (type === 'update') {
      if (!this._updateObject(payload)) {
        log.error('cannot update object', payload)
      }
      return
    }
    if (type === 'delete') {
      if (!this._deleteObject(payload)) {
        log.error('cannot delete object', payload)
      }
      return
    }
    if (type === 'create') {
      if (!this._createObject(payload)) {
        log.error('cannot create object', payload)
      }
      return
    }

    log.error('invalid object manipulation type', type)
  }

  _createObject (object) {
    switch (object.type) {
      case 'snake':
        if (this._snake === object.uuid) {
          this._canvas.draw(OBJECT_PLAYER, object.dots)
        } else {
          this._canvas.draw(OBJECT_SNAKE, object.dots)
        }
        this._storeSnakes.set(object.uuid, object)
        break
      case 'apple':
        this._canvas.draw(OBJECT_APPLE, [object.dot])
        this._storeFood.set(object.uuid, object)
        break
      case 'corpse':
        this._canvas.draw(OBJECT_CORPSE, object.dots)
        this._storeFood.set(object.uuid, object)
        break
      case 'watermelon':
        this._canvas.draw(OBJECT_WATERMELON, object.dots)
        this._storeFood.set(object.uuid, object)
        break
      case 'wall':
        this._canvas.draw(OBJECT_WALL, object.dots)
        this._storeWalls.set(object.uuid, object)
        break
      default:
        log.error('error cannot create object of invalid type:', object.type)
        return false
    }

    return true
  }

  _updateObject (object) {
    switch (object.type) {
      case 'snake':
        const snake = this._storeSnakes.get(object.uuid)
        if (snake) {
          const { clear, draw } = dotListsDifference(object.dots, snake.dots)
          if (this._snake === object.uuid) {
            this._canvas.draw(OBJECT_PLAYER, draw)
            this._canvas.clear(OBJECT_PLAYER, clear)
          } else {
            this._canvas.draw(OBJECT_SNAKE, draw)
            this._canvas.clear(OBJECT_SNAKE, clear)
          }
          this._storeSnakes.set(object.uuid, object)
          return true
        } else {
          log.error('snake to update not found')
        }
        break
      case 'apple':
        // Cannot update apple.
        log.error('cannot update apple')
        break
      case 'corpse':
        const corpse = this._storeFood.get(object.uuid)
        if (corpse) {
          const { clear, draw } = dotListsDifference(object.dots, corpse.dots)
          this._canvas.draw(OBJECT_CORPSE, draw)
          this._canvas.clear(OBJECT_CORPSE, clear)
          this._storeFood.set(object.uuid, object)
          return true
        } else {
          log.error('corpse to update not found')
        }
        break
      case 'watermelon':
        const watermelon = this._storeFood.get(object.uuid)
        if (watermelon) {
          const { clear, draw } = dotListsDifference(object.dots, watermelon.dots)
          this._canvas.draw(OBJECT_WATERMELON, draw)
          this._canvas.clear(OBJECT_WATERMELON, clear)
          this._storeFood.set(object.uuid, object)
          return true
        } else {
          log.error('watermelon to update not found')
        }
        break
      case 'wall':
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
      case 'snake':
        this._canvas.clear(OBJECT_SNAKE, object.dots)
        return this._storeSnakes.delete(object.uuid)
      case 'apple':
        this._canvas.clear(OBJECT_APPLE, [object.dot])
        return this._storeFood.delete(object.uuid)
      case 'corpse':
        const corpse = this._storeFood.get(object.uuid)
        if (corpse) {
          this._canvas.clear(OBJECT_CORPSE, corpse.dots)
          return this._storeFood.delete(object.uuid)
        }
        return false
      case 'watermelon':
        const watermelon = this._storeFood.get(object.uuid)
        if (watermelon) {
          this._canvas.clear(OBJECT_WATERMELON, watermelon.dots)
          return this._storeFood.delete(object.uuid)
        }
        return false
      case 'wall':
        const wall = this._storeWalls.get(object.uuid)
        if (wall) {
          this._canvas.clear(OBJECT_WALL, wall.dots)
          return this._storeWalls.delete(object.uuid)
        }
        return false
      default:
        log.error('error cannot delete object of invalid type:', object.type)
    }
  }

  _initStores () {
    this._storeSnakes = new Map()
    this._storeFood = new Map()
    this._storeWalls = new Map()
  }

  _clearStores () {
    this._storeSnakes.clear()
    this._storeFood.clear()
    this._storeWalls.clear()
  }

  start () {
  }

  stop () {
    this._clearStores()
  }
}

export default Playground
