FROM ubuntu:18.04

WORKDIR /app

RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    screen \
    && mkdir ~/.screen && chmod 700 ~/.screen \
    && export SCREENDIR=$HOME/.screen \
    && npm i -g yarn \
    && rm -rf /var/lib/apt/lists/*

ADD package.json yarn.lock ./
RUN yarn

ADD . .

CMD ./startpoint.sh
