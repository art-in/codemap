#!/bin/bash

# builds prod docker image with necessary tools and builds project inside of it
#
# options:
# --clean - recreates docker image skipping cache.
#           use it when changing build tools or project dependencies.

PROJECT_NAME=codemap
DOCKER_BASE_IMAGE_TAG=$PROJECT_NAME-base
DOCKER_PROD_IMAGE_TAG=artinphares/$PROJECT_NAME:latest

# go to project root
cd $(dirname $(realpath "$0")) && cd ../..

# handle args
while test $# -gt 0
do
    case "$1" in
        --clean) ARG_CLEAN=1 ;;
        *) echo "Invalid argument '$1'." && exit 1 ;;
    esac
    shift
done

if [[ $ARG_CLEAN ]] ; then
    DOCKER_ARG_NOCACHE=--no-cache
fi

# build base image
echo "Creating docker image '$DOCKER_BASE_IMAGE_TAG'..."
docker build . \
    --file ./docker/Dockerfile-base \
    --platform="linux/amd64" \
    --tag $DOCKER_BASE_IMAGE_TAG \
    $DOCKER_ARG_NOCACHE
echo "Created docker image '$DOCKER_BASE_IMAGE_TAG'."

# build prod image
echo "Creating docker image '$DOCKER_PROD_IMAGE_TAG'..."
docker build . \
    --file ./docker/Dockerfile-prod \
    --platform="linux/amd64" \
    --tag $DOCKER_PROD_IMAGE_TAG \
    $DOCKER_ARG_NOCACHE
echo "Created docker image '$DOCKER_PROD_IMAGE_TAG'."