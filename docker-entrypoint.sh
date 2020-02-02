#!/bin/sh
set -e

echo "Setting default env vars"

export NODE_ENV=production

exec "$@"