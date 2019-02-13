
const envDev = process.env.NODE_ENV === 'development'

const DEFAULT_SNAKE_SERVER_HOST = location.hostname || 'localhost'
const DEFAULT_SNAKE_SERVER_PORT = location.port || '8080'
const DEFAULT_SNAKE_SERVER_WEB_SCHEME = location.protocol || 'http'
const DEFAULT_SNAKE_SERVER_SOCKET_SCHEME = location.protocol === 'https' ? 'wss' : 'ws'

export const VERSION = process.env.VERSION
export const BUILD = process.env.BUILD
export const LICENSE = process.env.LICENSE
export const AUTHOR = process.env.AUTHOR

export const LOG_LEVEL = envDev ? 'trace' : 'silent'

export const SNAKE_SERVER_HOST = process.env.SNAKE_SERVER_HOST || DEFAULT_SNAKE_SERVER_HOST
export const SNAKE_SERVER_PORT = process.env.SNAKE_SERVER_PORT || DEFAULT_SNAKE_SERVER_PORT
export const SNAKE_SERVER_WEB_SCHEME = process.env.SNAKE_SERVER_WEB_SCHEME || DEFAULT_SNAKE_SERVER_WEB_SCHEME
export const SNAKE_SERVER_SOCKET_SCHEME = process.env.SNAKE_SERVER_SOCKET_SCHEME || DEFAULT_SNAKE_SERVER_SOCKET_SCHEME

const skipPort = (SNAKE_SERVER_PORT === '80' && SNAKE_SERVER_WEB_SCHEME === 'http') ||
  (SNAKE_SERVER_PORT === '443' && SNAKE_SERVER_WEB_SCHEME === 'https')

export const API_URL =
  SNAKE_SERVER_WEB_SCHEME + '://' +
  SNAKE_SERVER_HOST +
  (skipPort ? '' : ':' + SNAKE_SERVER_PORT) +
  '/api'

export const WS_URL =
  SNAKE_SERVER_SOCKET_SCHEME + '://' +
  SNAKE_SERVER_HOST +
  (skipPort ? '' : ':' + SNAKE_SERVER_PORT) +
  '/ws'

export const MOCK_API = envDev
export const MOCK_WS = envDev

export const SNAKE_CLIENT_NAME = 'SnakeLightweightClient'

export const SERVER_MESSAGES_COUNTER_PERIOD_SEC = 60
