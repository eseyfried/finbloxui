# FinbloxUI API Server

This server handles user registgration and login for NPM

## Run container locally

from the project root:

```shell
cd api
docker-compose up -d --build
```

To hit api endpoints:

```shell
curl localhost:3001
```
> in dev this runs on port 3001

## Build for Prod

from project root

```shell
docker build -t finbloxui-api --progress=plain --no-cache --build-arg env=prod -f ./infra/api/server/Dockerfile .
docker run --restart always --name finbloxui-api -p 3000:3000 <IMAGE SHA>
```
