import MockAdapter from 'axios-mock-adapter'
import clone from 'clone'
import _ from 'lodash'
import log from 'loglevel'

const DEFAULT_GAMES_LIMIT = 100
const MIN_GAME_RATE = 0
const MAX_GAME_RATE = 100

function randomInt (from, to) {
  return Math.floor(Math.random() * to) + from
}

function logRequest (config) {
  if (config.data) {
    log.info(config.method.toUpperCase(), config.url, config.headers, config.data)
  } else {
    log.info(config.method.toUpperCase(), config.url, config.headers)
  }
}

function getId (url) {
  const result = /\/(\d+)/.exec(url)
  if (result instanceof Array) {
    if (result.length > 1) {
      const id = parseInt(result[1])
      return isNaN(id) ? 0 : id
    }
  }
  return 0
}

class GamesAPIMock {
  constructor (limit) {
    this.count = 0
    this.limit = limit
    this.games = []
  }

  get (id) {
    let game = _.find(this.games, ['id', id])
    if (game === undefined) {
      return undefined
    }

    game = clone(game)
    game.rate = randomInt(MIN_GAME_RATE, MAX_GAME_RATE)
    game.count = randomInt(0, game.limit)

    return game
  }

  isFullServer () {
    return this.count === this.limit
  }

  create (params) {
    if (this.count === this.limit) {
      return
    }

    let id = 0

    do {
      id++
    } while (_.find(this.games, ['id', id]) !== undefined)

    const game = {
      id: id,
      width: params.width,
      height: params.height,
      limit: params.limit,
      count: 0,
      rate: 0
    }

    this.games.push(game)

    this.count = this.games.length

    return clone(game)
  }

  delete (id) {
    this.games = _.filter(this.games, game => game.id !== id)
    this.count = this.games.length
    return { id }
  }

  all () {
    const games = clone(this.games)
    _.forEach(games, game => {
      game.rate = randomInt(MIN_GAME_RATE, MAX_GAME_RATE)
      game.count = randomInt(0, game.limit)
    })

    return {
      count: this.count,
      limit: this.limit,
      games: games
    }
  }

  objects (id) {
    return {
      objects: []
    }
  }

  broadcast (id) {
    return {
      success: true
    }
  }
}

class ServerAPIMock {
  capacity () {
    return {
      capacity: Math.random()
    }
  }

  info () {
    return {
      author: 'Ivan Pushkin',
      license: 'MIT',
      version: 'v4.0.2',
      build: '8b70b56'
    }
  }

  ping () {
    return {
      pong: 1
    }
  }
}

function mockGameAPI (mock, gamesAPIMock) {
  mock.onGet(/games\/\d+/).reply(config => {
    logRequest(config)
    const data = gamesAPIMock.get(getId(config.url))
    return data === undefined ? [404, {
      code: 404,
      text: 'group not found'
    }] : [200, data]
  })

  mock.onPost('games').reply(config => {
    logRequest(config)

    if (gamesAPIMock.isFullServer()) {
      return [503, {
        code: 503,
        text: 'server is full'
      }]
    }

    const params = {
      width: 0,
      height: 0,
      limit: 0
    }

    if (config.data instanceof FormData) {
      const width = parseInt(config.data.get('width'))
      params.width = isNaN(width) ? 0 : width
      const height = parseInt(config.data.get('height'))
      params.height = isNaN(height) ? 0 : height
      const limit = parseInt(config.data.get('limit'))
      params.limit = isNaN(limit) ? 0 : limit
    }

    const data = gamesAPIMock.create(params)

    return [201, data]
  })

  mock.onDelete(/games\/\d+/).reply(config => {
    logRequest(config)
    const data = gamesAPIMock.delete(getId(config.url))
    return [200, data]
  })

  mock.onGet('games').reply(config => {
    logRequest(config)
    const data = gamesAPIMock.all()
    return [200, data]
  })

  mock.onGet(/games\/\d+\/objects/).reply(config => {
    logRequest(config)
    const data = gamesAPIMock.objects(getId(config.url))
    return [200, data]
  })

  mock.onGet(/games\/\d+\/broadcast/).reply(config => {
    logRequest(config)
    const data = gamesAPIMock.broadcast(getId(config.url))
    return [200, data]
  })
}

function mockServerAPI (mock, serverAPIMock) {
  mock.onGet('capacity').reply(config => {
    logRequest(config)
    const data = serverAPIMock.capacity()
    return [200, data]
  })

  mock.onGet('info').reply(config => {
    logRequest(config)
    const data = serverAPIMock.info()
    return [200, data]
  })

  mock.onGet('ping').reply(config => {
    logRequest(config)
    const data = serverAPIMock.info()
    return [200, data]
  })
}

export default axiosInstance => {
  const mock = new MockAdapter(axiosInstance)

  mockGameAPI(mock, new GamesAPIMock(DEFAULT_GAMES_LIMIT))
  mockServerAPI(mock, new ServerAPIMock())

  return mock
}
