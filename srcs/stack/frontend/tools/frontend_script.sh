#!/bin/sh

while ! pg_isready -h pgdb --quiet; do
    echo "[WEBSITE] Waiting for DB..."
    sleep 2
done

cd app
npm run start