FROM node:16-alpine

ARG APP_DIR=/var/www/learn-node/api
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build
