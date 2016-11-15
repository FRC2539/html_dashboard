#!/bin/bash
if [[ ! -x node_modules/nw/nwjs/nw ]]
then
    npm install nw
fi
cd www
pynetworktables2js --port 2539 --robot roborio-2539-frc.local &
cd ../
sleep 2
npm start
kill $!

