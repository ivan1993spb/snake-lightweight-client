
import log from 'loglevel'

const SERVER_MESSAGE_TYPE_GAME = 'game'
const SERVER_MESSAGE_TYPE_PLAYER = 'player'
const SERVER_MESSAGE_TYPE_BROADCAST = 'broadcast'

const SERVER_MESSAGE_PLAYER_TYPE_SIZE = 'size'
const SERVER_MESSAGE_PLAYER_TYPE_SNAKE = 'snake'
const SERVER_MESSAGE_PLAYER_TYPE_NOTICE = 'notice'
const SERVER_MESSAGE_PLAYER_TYPE_ERROR = 'error'
const SERVER_MESSAGE_PLAYER_TYPE_COUNTDOWN = 'countdown'
const SERVER_MESSAGE_PLAYER_TYPE_OBJECTS = 'objects'

const SERVER_MESSAGE_GAME_TYPE_DELETE = 'delete'
const SERVER_MESSAGE_GAME_TYPE_CREATE = 'create'
const SERVER_MESSAGE_GAME_TYPE_UPDATE = 'update'
const SERVER_MESSAGE_GAME_TYPE_ERROR = 'error'

export class Handler {
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
      if (m.type === SERVER_MESSAGE_TYPE_GAME) {
        this._handleServerMessageGame(m.payload)
      } else if (m.type === SERVER_MESSAGE_TYPE_PLAYER) {
        this._handleServerMessagePlayer(m.payload)
      } else if (m.type === SERVER_MESSAGE_TYPE_BROADCAST) {
        this._handleServerMessageBroadcast(m.payload)
      } else {
        log.warn('invalid server message type', m.type)
      }
    }
  }

  _handleServerMessagePlayer (message) {
    if (message.hasOwnProperty('type') && message.hasOwnProperty('payload')) {
      switch (message.type) {
        case SERVER_MESSAGE_PLAYER_TYPE_SIZE:
          this._playground.setSize(message.payload.width, message.payload.height)
          break
        case SERVER_MESSAGE_PLAYER_TYPE_SNAKE:
          this._playground.setPlayerSnake(message.payload)
          break
        case SERVER_MESSAGE_PLAYER_TYPE_NOTICE:
          log.info('PLAYER NOTICE', message.payload)
          break
        case SERVER_MESSAGE_PLAYER_TYPE_ERROR:
          log.error('PLAYER ERROR', message.payload)
          break
        case SERVER_MESSAGE_PLAYER_TYPE_COUNTDOWN:
          log.info('PLAYER COUNTDOWN', message.payload, 'seconds')
          break
        case SERVER_MESSAGE_PLAYER_TYPE_OBJECTS:
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
        if (message.type === SERVER_MESSAGE_GAME_TYPE_DELETE) {
          // Cache deleting
          this.objectsDeleteMessages.push(message)
          return
        } else if (message.type === SERVER_MESSAGE_GAME_TYPE_UPDATE) {
          // Ignore updating
          return
        } else if (message.type === SERVER_MESSAGE_GAME_TYPE_CREATE) {
          // Pass creating
        }
      }

      if (message.type !== SERVER_MESSAGE_GAME_TYPE_ERROR) {
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

export default Handler
