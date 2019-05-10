#!/bin/bash

# discord server
./start_discord.sh -D
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start my_first_process: $status"
  exit $status
fi

# http server
node http.js
