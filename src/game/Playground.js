import _ from 'lodash'
import log from 'loglevel'

export class Game {
  constructor (canvasSnakes, canvasFood, canvasWalls, canvasGrid, width, height) {
    this._canvasSnakes = canvasSnakes
    this._canvasFood = canvasFood
    this._canvasWalls = canvasWalls
    this._canvasGrid = canvasGrid

    this._width = width
    this._height = height

    // Player's snake uuid
    this._snake = ''

    this._contextSnakes = this._canvasSnakes.getContext('2d', { alpha: false })
    this._contextFood = this._canvasFood.getContext('2d', { alpha: true })
    this._contextWalls = this._canvasWalls.getContext('2d', { alpha: true })
    this._contextGrid = this._canvasGrid.getContext('2d', { alpha: true })

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
        this._storeSetObject(object)
        this._drawObject(object)
      })
    }
  }

  handleGameEvent (type, payload) {
    log.debug('MONIPULATION', type, payload)
    if (type === 'update') {
      this._storeUpdateObject(payload)
      return
    }
    if (type === 'delete') {
      if (!this._storeDeleteObject(payload)) {
        log.warn('object to delete not found in local store', payload)
      }
      return
    }
    if (type === 'create') {
      this._storeSetObject(payload)
      return
    }

    log.warn('invalid object manipulation type', type)
  }

  _storeSetObject (object) {
    // TODO: Signal here to draw dots
    switch (object.type) {
      case 'snake':
        return this.storeSnakes.set(object.uuid, object)
      case 'apple':
      case 'corpse':
      case 'watermelon':
        return this.storeFood.set(object.uuid, object)
      case 'wall':
        return this.storeWalls.set(object.uuid, object)
    }
  }

  _dotComparator (firstDot, secondDot) {
    return (
      firstDot instanceof Array && secondDot instanceof Array &&
      firstDot.length === 2 && secondDot.length === 2 &&
      firstDot[0] === secondDot[0] && firstDot[1] === secondDot[1]
    )
  }

  _dotListsDifference (firstDots, secondDots) {
    return {
      clear: _.differenceWith(firstDots, secondDots, this._dotComparator),
      draw: _.differenceWith(secondDots, firstDots, this._dotComparator)
    }
  }

  _storeUpdateObject (object) {
    // TODO: Signal here to delete and draw dots
    switch (object.type) {
      case 'snake':
        const snake = this.storeSnakes.get(object.uuid)
        if (snake) {
          const { clear, draw } = this._dotListsDifference(object.dots, snake.dots)
          log.debug('DOT CLEAR', clear)
          log.debug('DOT DRAW', draw)
          this.storeSnakes.set(object.uuid, object)
        } else {
          log.warn('snake to update not found')
        }
        break
      case 'apple':
        // Cannot update apple.
        break
      case 'corpse':
        const corpse = this.storeFood.get(object.uuid)
        if (corpse) {
          const { clear, draw } = this._dotListsDifference(object.dots, corpse.dots)
          log.debug('DOT CLEAR', clear)
          log.debug('DOT DRAW', draw)
          this.storeFood.set(object.uuid, object)
        } else {
          log.warn('corpse to update not found')
        }
        break
      case 'watermelon':
        const watermelon = this.storeFood.get(object.uuid)
        if (watermelon) {
          const { clear, draw } = this._dotListsDifference(object.dots, watermelon.dots)
          log.debug('DOT CLEAR', clear)
          log.debug('DOT DRAW', draw)
          this.storeFood.set(object.uuid, object)
        } else {
          log.warn('watermelon to update not found')
        }
        break
      case 'wall':
        // Nothing to do here.
        break
    }
  }

  _storeDeleteObject (object) {
    // TODO: Signal here to delete dots
    switch (object.type) {
      case 'snake':
        return this.storeSnakes.delete(object.uuid)
      case 'apple':
      case 'corpse':
      case 'watermelon':
        return this.storeFood.delete(object.uuid)
      case 'wall':
        return this.storeWalls.delete(object.uuid)
    }
  }

  _drawObject (object) {
    // Initial draw object
    log.debug('DEBUG', 'object to draw', object)
  }

  _initStores () {
    this.storeSnakes = new Map()
    this.storeFood = new Map()
    this.storeWalls = new Map()
  }

  _clearStores () {
    this.storeSnakes.clear()
    this.storeFood.clear()
    this.storeWalls.clear()
  }

  start () {
  }

  stop () {
    this._clearStores()
  }
}

export default Game