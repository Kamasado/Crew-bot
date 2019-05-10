FROM node:11.14.0

WORKDIR /app

RUN apt-get update && apt-get install -y \
    screen \
    && rm -rf /var/lib/apt/lists/*

RUN chmod -R 777 /run/screen

ADD package.json yarn.lock ./
RUN yarn

ADD . .

CMD ./startpoint.sh
