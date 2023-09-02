FROM node:lts-alpine as build-stage



# docker build -t finbloxui-registry --progress=plain --no-cache --build-arg env=prod -f ./infra/verdaccio/Dockerfile .
# docker run -d --restart always --name registry -p 4873:4873 --network finbloxui-network <IMAGE>
RUN mkdir /verdaccio
WORKDIR /verdaccio
# RUN mkdir ./storage
# RUN mkdir ./plugins
COPY ./infra/verdaccio/conf ./conf
# RUN mkdir ./conf/storage


FROM verdaccio/verdaccio as production-stage

# WORKDIR /verdaccio

# COPY --from=build-stage /verdaccio/storage ./storage
# COPY --from=build-stage /verdaccio/conf ./conf
# COPY --from=build-stage /verdaccio/plugins ./plugins

COPY ./infra/verdaccio/conf/config.yaml /verdaccio/conf
COPY ./infra/verdaccio/conf/htpasswd /verdaccio/storage/htpasswd

WORKDIR /opt/verdaccio