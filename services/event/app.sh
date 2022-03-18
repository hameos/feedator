#!/bin/bash

docker build . -t feedator/event
docker run --name feedator_event --net feedator-net -p 80:4002 -d feedator/event
