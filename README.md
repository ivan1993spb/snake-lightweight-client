# Snake-Lightweight-Client

[![Build Status](https://travis-ci.org/ivan1993spb/snake-lightweight-client.svg?branch=master)](https://travis-ci.org/ivan1993spb/snake-lightweight-client) [![GitHub release](https://img.shields.io/github/release/ivan1993spb/snake-lightweight-client.svg)](https://github.com/ivan1993spb/snake-lightweight-client/releases/latest) [![license](https://img.shields.io/github/license/ivan1993spb/snake-lightweight-client.svg)](LICENSE)

Snake-Lightweight-Client is a client for the Snake-Server. See a working instance here - http://snakeonline.xyz

Snake-Server source code: https://github.com/ivan1993spb/snake-server

## Demo

[![Client screenshot](demo.gif)](http://snakeonline.xyz)

[Try it out!](http://snakeonline.xyz)

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

To disable mocks in development mode use environment variables before `yarn run serve`

```bash
export SNAKE_SERVER_ENABLE_MOCK=false
export SNAKE_SERVER_PORT=8080
export SNAKE_SERVER_HOST=localhost
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

```
yarn run test:unit
```

## License

See [LICENSE](LICENSE).
