#!/bin/sh

# runs prod docker image

PROJECT_NAME=codemap
DOCKER_PROD_IMAGE_TAG=artinphares/$PROJECT_NAME:latest

docker run -p 80:80 $DOCKER_PROD_IMAGE_TAG