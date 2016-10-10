#!/bin/bash
set -x
set -e
if [[ $(docker ps -q --filter name=texla-api$ | wc -l) -gt 0 ]]
then
    docker stop texla-api
fi

if [[ $(docker ps -aq --filter name=texla-api$ | wc -l) -gt 0 ]]
then
    docker rm texla-api
fi

git pull origin master
git checkout master

docker build -t wikitolearn/texla-api --rm .
docker run \
  --name texla-api \
  -p 80:80 \
  --restart=always \
  -d wikitolearn/texla-api
