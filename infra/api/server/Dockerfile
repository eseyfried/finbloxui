# docker build -t finbloxui-api --progress=plain --no-cache --build-arg env=prod -f ./infra/api/server/Dockerfile .
# docker run --restart always --name finbloxui-api -p 3000:3000

FROM mhart/alpine-node:16
# optional build arg passed in docker run or set in docker-compose with value nodemon or node. This is typically used for development env only
ARG node_cmd
ARG node_args
# defaults to node if build arg is not set
ENV NODE_CMD=${node_cmd:-node}
ENV NODE_ARGS=${node_args}

# Create app directory
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

# Install app dependencies
COPY ./api/package.json /usr/src/api/
# install nodemon if node_cmd is nodemon. This allows for auto restarts of node when code is changed
RUN if [ $node_cmd = "nodemon" ]; then npm install -g nodemon; fi
RUN npm install

# Bundle app source
COPY ./api /usr/src/api

EXPOSE 3000

RUN echo "Using ${NODE_CMD}"

CMD ${NODE_CMD} ${NODE_ARGS} server.js