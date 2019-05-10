#!/bin/bash

# discord server
screen -dmS 'discord' yarn start

# http server
node http.js
