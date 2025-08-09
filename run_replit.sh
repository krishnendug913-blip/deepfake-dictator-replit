#!/bin/bash
python -m pip install --upgrade pip
pip install -r requirements.txt
npm install
node server.js &
sleep 2
echo "Server started"
tail -f /dev/null
