#!/bin/sh

echo "Building server ..."
(cd ./frontend/server && npm install)

echo "Building client ..."
(cd ./frontend/client && npm install && ./build.sh)

echo "Building loc ..."
(cd ./loc && ./build.sh)
