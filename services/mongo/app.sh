#!/bin/bash

docker run -d --name feedator_mongo --net feedator-net -v $(pwd)/services/mongo/data:/data/db mongo
