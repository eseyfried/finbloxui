FROM verdaccio/verdaccio

# docker build -t finbloxui-registry --progress=plain --no-cache --build-arg env=prod -f ./infra/verdaccio/Dockerfile .
# docker run -d --restart always --name registry -p 4873:4873 --network finbloxui-network <IMAGE>

WORKDIR /verdaccio
RUN mkdir conf
RUN mkdir storage
# COPY ./infra/verdaccio/storage ./storage
COPY ./infra/verdaccio/conf ./conf
# COPY ./infra/verdaccio/plugins ./plugins

WORKDIR /opt/verdaccio