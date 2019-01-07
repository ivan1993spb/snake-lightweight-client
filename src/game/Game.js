
import urljoin from 'url-join'
import EventEmitter from 'wolfy87-eventemitter'
import _ from 'lodash'
import { WS_URL } from '@/common/config'

export class Game {
  constructor (canvasSnakes, canvasFood, canvasWalls, canvasGrid, id, width, height) {
    this.canvasSnakes = canvasSnakes
    this.canvasFood = canvasFood
    this.canvasWalls = canvasWalls
    this.canvasGrid = canvasGrid

    this.id = id
    this.width = width
    this.height = height

    // Player's snake uuid
    this.snake = ''

    this._initContext()
    this._initSocketURL()
    this._initEventEmitters()
    this._initSocketListeners()
    this._initGameListeners()
    this._initStores()
  }

  _initContext () {
    this.contextSnakes = this.canvasSnakes.getContext('2d', { alpha: false })
    this.contextFood = this.canvasFood.getContext('2d', { alpha: true })
    this.contextWalls = this.canvasWalls.getContext('2d', { alpha: true })
    this.contextGrid = this.canvasGrid.getContext('2d', { alpha: true })
  }

  _initSocketURL () {
    this.socketURL = urljoin(WS_URL, 'games', this.id.toString())
  }

  _initEventEmitters () {
    // To listen socket events
    this.socketEventListener = new EventEmitter()
    // To listen game events
    this.gameEventListener = new EventEmitter()
    // To listen player
    this.playerEventListener = new EventEmitter()
  }

  _handleGameMessage (data) {
    const gameMessage = JSON.parse(data)
    if (gameMessage.hasOwnProperty('type') && gameMessage.hasOwnProperty('payload')) {
      this.gameEventListener.emitEvent(gameMessage.type, [gameMessage.payload])
    }
  }

  _initSocketListeners () {
    this.socketEventListener.addListeners({
      onmessage: event => {
        this._handleGameMessage(event.data)
      },
      onclose: event => {
        console.log('onclose', event)
      },
      onerror: event => {
        console.log('onerror', event)
      },
      onopen: event => {
        console.log('onopen', event)
      }
    })
  }

  _handleGameMessagePlayer (data) {
    if (data.hasOwnProperty('type') && data.hasOwnProperty('payload')) {
      switch (data.type) {
        case 'size':
          break
        case 'snake':
          this.snake = data.payload
          break
        case 'notice':
          break
        case 'error':
          break
        case 'countdown':
          break
        case 'objects':
          this._loadObjects(data.payload)
          break
      }
    }
  }

  _loadObjects (objects) {
    if (objects instanceof Array) {
      _.forEach(objects, object => {
        this._storeSetObject(object)
        this._drawObject(object)
      })
    }
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

  _dotListsDifference (firstDots, secondDots) {
    return _.differenceWith(firstDots, secondDots, (firstDot, secondDot) => {
      return (
        firstDot instanceof Array && secondDot instanceof Array &&
        firstDot.length === 2 && secondDot.length === 2 &&
        firstDot[0] === secondDot[0] && firstDot[1] === secondDot[1]
      )
    })
  }

  _storeUpdateObject (object) {
    // TODO: Signal here to delete and draw dots
    switch (object.type) {
      case 'snake':
        const snake = this.storeSnakes.get(object.uuid)
        if (snake) {
          console.log('DOT CLEAR', this._dotListsDifference(object.dots, snake.dots))
          console.log('DOT DRAW', this._dotListsDifference(snake.dots, object.dots))
          this.storeSnakes.set(object.uuid, object)
        } else {
          console.warn('snake to update not found')
        }
        break
      case 'apple':
        // Cannot update apple.
        break
      case 'corpse':
        const corpse = this.storeFood.get(object.uuid)
        if (corpse) {
          console.log('DOT CLEAR', this._dotListsDifference(object.dots, corpse.dots))
          console.log('DOT DRAW', this._dotListsDifference(corpse.dots, object.dots))
          this.storeFood.set(object.uuid, object)
        } else {
          console.warn('corpse to update not found')
        }
        break
      case 'watermelon':
        const watermelon = this.storeFood.get(object.uuid)
        if (watermelon) {
          console.log('DOT CLEAR', this._dotListsDifference(object.dots, watermelon.dots))
          console.log('DOT DRAW', this._dotListsDifference(watermelon.dots, object.dots))
          this.storeFood.set(object.uuid, object)
        } else {
          console.warn('watermelon to update not found')
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
    console.log('DEBUG', 'object to draw', object)
  }

  _handleGameMessageBroadcast (message) {
    console.log('BROADCAST', message)
  }

  _handleGameMessageGameError (error) {
    console.log('GAME ERROR', error)
  }

  _handleGameMessageGame (data) {
    if (data.hasOwnProperty('type') && data.hasOwnProperty('payload')) {
      if (data.type === 'error') {
        this._handleGameMessageGameError(data.payload)
      } else {
        this._handleGameMessageGameObjectManipulation(data.type, data.payload)
      }
    }
  }

  _handleGameMessageGameObjectManipulation (action, object) {
    console.log('MONIPULATION', action, object)
    if (action === 'update') {
      this._storeUpdateObject(object)
      return
    }
    if (action === 'delete') {
      if (!this._storeDeleteObject(object)) {
        console.warn('object to delete not found in local store', object)
      }
      return
    }
    if (action === 'create') {
      this._storeSetObject(object)
      return
    }

    console.warn('invalid object manipulation type', action)
  }

  _initGameListeners () {
    this.gameEventListener.addListeners({
      game: data => {
        this._handleGameMessageGame(data)
      },
      player: data => {
        this._handleGameMessagePlayer(data)
      },
      broadcast: data => {
        this._handleGameMessageBroadcast(data)
      }
    })
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

  _connect () {
    // TODO: Mock web-socket

    this.ws = new WebSocket(this.socketURL)

    const events = ['onmessage', 'onclose', 'onerror', 'onopen']

    events.forEach((eventType) => {
      this.ws[eventType] = (event) => {
        this.socketEventListener.emitEvent(eventType, [event])
      }
    })
  }

  _disconnect () {
    // Normal Closure
    this.ws.close(1000, 'Normal Closure')
  }

  start () {
    this._connect()
  }

  stop () {
    this._disconnect()
    this._clearStores()
  }
}

export default Game
