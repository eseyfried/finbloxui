
# docker build -t finbloxui-registry --progress=plain --no-cache --build-arg env=prod -f ./infra/verdaccio/Dockerfile .
# docker run -d --restart always --name registry -p 4873:4873 --network finbloxui-network <IMAGE>



FROM verdaccio/verdaccio

COPY ./infra/verdaccio/conf/config.yaml /verdaccio/conf
COPY ./infra/verdaccio/conf/htpasswd /verdaccio/storage/htpasswd

WORKDIR /opt/verdaccio