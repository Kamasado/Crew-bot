#!/bin/bash

# discord server
screen -dm -S 'discord' yarn start
# http server
node http.js
