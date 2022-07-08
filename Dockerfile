FROM node:14.20 AS builder

WORKDIR /usr/local/app

COPY . .

RUN yarn install \
 && yarn test:unit \
 && yarn run lint \
 && yarn build

FROM scratch

COPY --from=builder /usr/local/app/dist \
  /usr/local/share/snake-lightweight-client
