FROM node:14.20 AS builder

WORKDIR /usr/local/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn test:unit \
 && yarn run lint \
 && yarn build

FROM nginx:1.23.0-alpine

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx/snake.conf /etc/nginx/conf.d/

COPY --from=builder /usr/local/app/dist \
  /usr/local/share/snake-lightweight-client
