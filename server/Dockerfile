FROM node:20-alpine AS build

WORKDIR /usr/src/app

RUN apk update && apk upgrade

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build


FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

CMD ["node", "dist/index.js"]