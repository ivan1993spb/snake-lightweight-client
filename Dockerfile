FROM node:14.20 AS builder

WORKDIR /usr/local/app

COPY . .

RUN yarn install \
 && yarn test:unit \
 && yarn run lint \
 && yarn build

FROM nginx:1.23.0-alpine

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx/snake.conf /etc/nginx/conf.d/

COPY --from=builder /usr/local/app/dist \
  /usr/local/share/snake-lightweight-client
