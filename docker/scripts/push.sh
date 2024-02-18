#!/bin/sh

# pushes prod docker image to hub

PROJECT_NAME=codemap
DOCKER_PROD_IMAGE_TAG=artinphares/$PROJECT_NAME:latest

docker image push $DOCKER_PROD_IMAGE_TAG