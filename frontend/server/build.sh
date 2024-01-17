#!/bin/sh

mkdir build

deno compile --allow-all --output build/server src/server.ts