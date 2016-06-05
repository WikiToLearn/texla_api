#!/bin/bash

docker run -ti \
        --name texla-api \
        -p 80:80 \
        wikitolearn/texla-api
