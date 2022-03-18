#!/bin/bash

docker stop feedator_mosquitto feedator_event feedator_mongo feedator_syncer feedator_importer

docker network rm feedator-net
