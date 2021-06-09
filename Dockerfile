# Install dependencies only when needed
FROM mhart/alpine-node:16.2.0 AS base

WORKDIR /app

# Installing dependencies
COPY package*.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN NEXT_PUBLIC_API_HOST="https://concheckin-beta.dtap.cloud" yarn build

CMD [ "yarn", "start" ]