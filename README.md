# Snake-Lightweight-Client

[![GitHub release](https://img.shields.io/github/release/ivan1993spb/snake-lightweight-client.svg)](https://github.com/ivan1993spb/snake-lightweight-client/releases/latest) [![license](https://img.shields.io/github/license/ivan1993spb/snake-lightweight-client.svg)](LICENSE)

The Snake Lightweight Client is a web client for the Snake-Server.

Find the source for the server here: https://github.com/ivan1993spb/snake-server

[![Client screenshot](demo.gif)](https://snakeonline.xyz)

## Setup

```
yarn install
```

### Compile and hot-reload for development

```
yarn run serve
```

To disable mocks in development mode use the environment variable before `yarn run serve`

```bash
export SNAKE_SERVER_ENABLE_MOCK=false
```

For an HTTP instance of the server:

```bash
export SNAKE_SERVER_HOST=localhost
export SNAKE_SERVER_PORT=8080
```

HTTPS:

```bash
export SNAKE_SERVER_HOST=localhost
export SNAKE_SERVER_PORT=443
export SNAKE_SERVER_WEB_SCHEME=https
export SNAKE_SERVER_SOCKET_SCHEME=wss
```

### Build for production

```
yarn run build
```

### Run tests

```
yarn run test
```

### Linting

```
yarn run lint
```

### Run units

```
yarn run test:unit
```

## License

See [LICENSE](LICENSE)
