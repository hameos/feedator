#!/bin/bash

BASE_DIR=$(pwd)/../services

FEEDATOR_NET=feedator-net
if [ -z "$(docker network ls | grep $FEEDATOR_NET)" ]; then
  docker network create $FEEDATOR_NET
fi

cd $BASE_DIR/mongo
./app.sh
cd $BASE_DIR/mosquitto
./app.sh
cd $BASE_DIR/event
./app.sh
cd $BASE_DIR/importer
./app.sh
cd $BASE_DIR/syncer
./app.sh
