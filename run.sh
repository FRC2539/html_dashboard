#!/bin/bash
if [[ ! -x node_modules/nw/nwjs/nw ]]
then
    npm install nw
fi
./tornado_server.py --port 2539 --robot roborio-2539-frc.local &
sleep 2
npm start
kill $!

