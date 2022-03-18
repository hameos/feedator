#!/bin/bash

docker run -d --name feedator_mosquitto -v $(pwd)/mosquitto.conf:/mosquitto/config/mosquitto.conf --net feedator-net eclipse-mosquitto
