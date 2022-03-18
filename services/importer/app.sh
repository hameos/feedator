#!/bin/bash

docker build . -t feedator/importer
docker run --name feedator_importer -v $(pwd)/../share:/feedator/services/share --net feedator-net -d feedator/importer
