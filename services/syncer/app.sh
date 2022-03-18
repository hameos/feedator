#!/bin/bash

docker build . -t feedator/syncer
docker run --name feedator_syncer -v $(pwd)/../share:/feedator/services/share --net feedator-net -d feedator/syncer
