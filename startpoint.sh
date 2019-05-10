#!/bin/bash

mkdir ~/.screen && chmod 700 ~/.screen
export SCREENDIR=$HOME/.screen

# discord server
screen -dmS 'discord' yarn start

# http server
node http.js
