#!/bin/sh
set -e

# echo "$1" | crontab - && crond -f -L /dev/stdout
crontab /app/config/crontabs && crond -f -L /dev/stdout