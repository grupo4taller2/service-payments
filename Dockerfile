ARG APP_ENV=production

FROM node:18.9.0-slim

WORKDIR /opt/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

RUN mkdir logs
COPY src/ ./src
COPY deployments/ ./deployments

CMD npm run dev-start