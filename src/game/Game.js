
import log from 'loglevel'

export class Game {
  constructor (playground) {
    this._playground = playground

    // To prevent the case on map initialization when server sends objects message
    // after an object update message
    this.objectsLoaded = false
    this.objectsDeleteMessages = []
  }

  handleServerMessage (message) {
    const m = JSON.parse(message)

    if (m.hasOwnProperty('type') && m.hasOwnProperty('payload')) {
      if (m.type === 'game') {
        this._handleServerMessageGame(m.payload)
      } else if (m.type === 'player') {
        this._handleServerMessagePlayer(m.payload)
      } else if (m.type === 'broadcast') {
        this._handleServerMessageBroadcast(m.payload)
      } else {
        log.warn('invalid server message type', m.type)
      }
    }
  }

  _handleServerMessagePlayer (message) {
    if (message.hasOwnProperty('type') && message.hasOwnProperty('payload')) {
      switch (message.type) {
        case 'size':
          this._playground.setSize(message.payload.width, message.payload.height)
          break
        case 'snake':
          this._playground.setPlayerSnake(message.payload)
          break
        case 'notice':
          log.info('PLAYER NOTICE', message.payload)
          break
        case 'error':
          log.error('PLAYER ERROR', message.payload)
          break
        case 'countdown':
          log.info('PLAYER COUNTDOWN', message.payload, 'seconds')
          break
        case 'objects':
          log.info('received objects to load')
          this._handleServerMessagePlayerObjects(message)
          break
        default:
          log.error('invalid server message player type:', message.type)
      }
    }
  }

  _handleServerMessagePlayerObjects (message) {
    if (this.objectsLoaded) {
      log.error('objects have already loaded')
      return
    }

    this._playground.loadObjects(message.payload)
    this.objectsLoaded = true
    log.info('objects have loaded')

    if (this.objectsDeleteMessages.length > 0) {
      this.objectsDeleteMessages.forEach(message => {
        this._playground.handleGameEvent(message.type, message.payload)
      })
      log.info('outdated objects deleted:', this.objectsDeleteMessages.length)
      this.objectsDeleteMessages = []
    }
  }

  _handleServerMessageBroadcast (message) {
    log.info('BROADCAST', message)
  }

  _handleServerMessageGame (message) {
    if (message.hasOwnProperty('type') && message.hasOwnProperty('payload')) {
      if (!this.objectsLoaded) {
        log.warn('game message received before objects loading:', message.type)

        // While objects have not loaded:
        // Message type 'delete' - to cache
        // Message type 'create' - to pass
        // Message type 'update' - to ignore
        if (message.type === 'delete') {
          this.objectsDeleteMessages.push(message)
          return
        } else if (message.type === 'update') {
          return
        }
      }

      if (message.type !== 'error') {
        this._playground.handleGameEvent(message.type, message.payload)
      } else {
        this._handleServerMessageGameError(message.payload)
      }
    }
  }

  _handleServerMessageGameError (error) {
    log.error('GAME ERROR', error)
  }

  start () {
    this._playground.start()
  }

  stop () {
    this._playground.stop()
  }
}

export default Game
