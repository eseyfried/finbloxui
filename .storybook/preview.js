/** @type { import('@storybook/vue3').Preview } */
import { withThemeByDataAttribute } from '@storybook/addon-styling';
// import "../src/assets/tailwind.css";
import "tailwindcss/tailwind.css";
import "..//src/stories/Examples/index.css"

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview;

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-mode',
  }),
];


import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia';


const pinia = createPinia();

setup((app) => {
    app.use(pinia)
})