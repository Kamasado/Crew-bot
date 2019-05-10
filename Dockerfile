FROM node:11.14.0

WORKDIR /app

ADD package.json yarn.lock ./
RUN yarn

ADD . .

CMD yarn start
