
# build stage
FROM node:lts-alpine as build-stage
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=8192

RUN mkdir -p /var/app
WORKDIR /var/app

COPY . .

RUN npm install

RUN pwd
RUN ls -l
# run tests
RUN npm run test run
# build sstorybook docs
RUN npm run build-storybook
# build public website app
RUN npm run build

# production stage
FROM nginx as production-stage

ARG env

COPY ./infra/configs/www/nginx.$env.conf /etc/nginx/conf.d/default.conf

# Create www directory
RUN mkdir -p /var/www/docs
# copy storybook docs content
COPY --from=build-stage /var/app/storybook-static /var/www/docs
# copy public website vue app
COPY --from=build-stage /var/app/dist /var/www/

# copy css assets for ToggleTheme
COPY --from=build-stage /var/app/node_modules/tailwindcss/tailwind.css /var/www/docs/node_modules/tailwindcss/tailwind.css
COPY --from=build-stage /var/app/src/assets/fontawesome/css/fontawesome.css /var/www/docs/src/assets/fontawesome/css/fontawesome.css
COPY --from=build-stage /var/app/src/assets/fontawesome/css/brands.css /var/www/docs/src/assets/fontawesome/css/brands.css
COPY --from=build-stage /var/app/src/assets/fontawesome/css/solid.css /var/www/docs/src/assets/fontawesome/css/solid.css
# COPY --from=build-stage /var/app/src/stories/Examples/index.css /var/www/docs/src/stories/Examples/index.css
COPY --from=build-stage /var/app/src/assets /var/www/docs/src/assets
COPY --from=build-stage /var/app/health.html /var/www/index.html