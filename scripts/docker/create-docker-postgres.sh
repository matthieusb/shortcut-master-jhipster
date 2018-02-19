#!/bin/bash

# Script used to create postgres container for development purposes

docker run --name postgres_shortcut_master -p 5432:5432 -e POSTGRES_USER=shortcutmaster -e POSTGRES_PASSWORD=shortcutmaster -d library/postgres:9.5
