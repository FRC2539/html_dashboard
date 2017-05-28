#!/bin/bash

server=0
wait=0
# Args (https://stackoverflow.com/a/29754866)
getopt --test > /dev/null
if [[ $? -eq 4 ]]; then
    SHORT=skd
    LONG=server-only,kill-server,debug

    PARSED=$(getopt --options $SHORT --longoptions $LONG --name "$0" -- "$@")
    if [[ $? -ne 0 ]]; then
        #  getopt has complained about wrong arguments to stdout
        exit 2
    fi

    eval set -- "$PARSED"

    while true; do
        case "$1" in
            -s|--server-only)
                server=1
                shift
                ;;
            -k|--kill-server)
                if [ ! -f ".pid" ]; then
                    echo "Could not get PID of process"
                    echo "If it is running, you will need to manually stop it..."
                    exit 2
                fi
                kill `cat .pid`
                rm .pid
                exit
                ;;
            -d|--debug)
                wait=1
                server=1
                shift
                ;;
            --)
                shift
                break
                ;;
            *)
                echo "Something has gone horribly wrong. Sorry."
                exit 3
                ;;
        esac
    done
fi

reused=0
if [ -f .pid ]; then
    pid=`cat .pid`
    if [ -z `ps -o pid= -p "$pid"` ]; then
        rm .pid
    else
        echo "Detected running server with PID $pid, not starting a second..."

        reused=1
    fi
fi

if [ $reused -ne 1 ]; then
    cd www
    if [ $wait -eq 1 ]; then
        pynetworktables2js --port 2539 --robot roborio-2539-frc.local
        exit
    else
        pynetworktables2js --port 2539 --robot roborio-2539-frc.local &> /dev/null &
    fi
    cd ../
    echo "$!" > .pid
fi

if [ $server -eq 1 ]; then
    if [ $reused -ne 1 ]; then
        echo "Server started at http://localhost:2539"
    fi
else
    sleep 2
    npm start
    if [ $reused -ne 1 ]; then
        kill $!
        rm .pid
    fi
fi

