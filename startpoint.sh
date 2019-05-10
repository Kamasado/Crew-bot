#!/bin/bash

# http server
screen -dm -S 'http' node http.js

# discord server
yarn start
