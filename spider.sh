#!/bin/sh

# cd /usr/src/app && node -r esm app $1 | node -r esm /app/app
# echo "spider config: $1"
cd /usr/src/app && node -r esm app $1 | node -r esm /app/app