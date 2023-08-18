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