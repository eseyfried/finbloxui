# storybook-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
npm i -g hygen
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Creating a New Component
Using a hygen generator, we can scoffold a new set of component files:

- vue SFC
- vue spec
- storybook files

Make sure you have hygenn installed
```sh
npm i -g hygen
```

Then from `/src` run:
```sh
hygen component with-prompt
```

### Production Build
from within project root:

#### docker build
 ```sh
 docker build --progress=plain --no-cache --build-arg env=dev -f ./infra/configs/www/Dockerfile .
 ```
#### docker run
```sh
docker run --name finbloxui-www -p 7080:80 <IMAGE>
```

## Testing NPM build package locally
create a separate vue+vite project:

prompted:
```shell
npm create vite@latest
```
or simple template:
```shell
npm create vite@latest vue-app -- --template vue
```
From the root of that project run:
```shell
sudo npm link ../path/to/storybook-vue/storybook-vue
npm install # <-- not sure of this step
npm run dev
```

Changes made to finbloxui will be seen here after running npm run build on finbloxui (storybook-vue).

### removing local link
```shell
sudo npm unlink ../path/to/storybook-vue/storybook-vue
```

## Build NPM Package
```shell
npm run build-lib
```

### Publish NPM Local Verdaccio

Make sure you're logged into registry:

```shell
npm adduser --registry http://localhost:4873/
username: admin
password: 
```
> This admin user and password must have been generated and added to the Verdaccio htpasswd file.

bump version number in package json

```shell
cd /path/to/storybook-vue/storybook-vue
npm publish --@finbloxui:registry=http://localhost:4873/
```

### Publish NPM to Private Registry

Make sure you're logged into registry:

```shell
npm adduser --registry http://registry.finbloxui.com/
username: admin
password: 
```
> This admin user and password must have been generated and added to the Verdaccio htpasswd file.

bump version number in package json

```shell
cd /path/to/storybook-vue/storybook-vue
npm publish
```

## Adding NPM Registry Users

1. Create htpasswd credentials
2. Add string from step 1 to `conf/htpasswd` file
