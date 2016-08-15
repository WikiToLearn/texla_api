#!/bin/bash
set -x
set -e
docker stop texla-api
docker rm texla-api
git pull origin master
git checkout master
docker build -t wikitolearn/texla-api --rm .
docker run \
  --name texla-api \
  -p 80:80 \
  --restart=always \
  -d wikitolearn/texla-api
