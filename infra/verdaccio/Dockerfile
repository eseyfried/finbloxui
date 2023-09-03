
# docker build -t finbloxui-registry --progress=plain --no-cache --build-arg env=prod -f ./infra/verdaccio/Dockerfile .
# docker run -d --restart always --name registry -p 4873:4873 --network finbloxui-network <IMAGE>


# build plugin
FROM verdaccio/verdaccio

USER root
###
# copy basic config and htpasswd file
###
COPY ./infra/verdaccio/conf/config.yaml /verdaccio/conf
COPY ./infra/verdaccio/conf/htpasswd /verdaccio/storage/htpasswd
###
# copy plugin source, install deps and build plugin
##
RUN mkdir -p /tmp/build
COPY ./infra/verdaccio/plugins/verdaccio-finbloxui-auth /tmp/build
WORKDIR /tmp/build
RUN npm install
RUN npm run build
COPY ./infra/verdaccio/plugins/verdaccio-finbloxui-auth/package.* .
###
# install plugin
###
RUN npm install -g /tmp/build
RUN ln -s /tmp/build /verdaccio/plugins/verdaccio-finbloxui-auth
RUN chown -R $VERDACCIO_USER_UID:root /verdaccio/plugins


USER verdaccio

WORKDIR /opt/verdaccio

