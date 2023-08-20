/** @type { import('@storybook/vue3').Preview } */
import { withThemeByDataAttribute } from '@storybook/addon-styling';
// import "tailwindcss/tailwind.css";
import "../src/assets/fontawesome/css/fontawesome.css";
import "../src/assets/fontawesome/css/brands.css";
import "../src/assets/fontawesome/css/solid.css";
import "../src/stories/Examples/preflight.scss"
import "../src/stories/Examples/index.css"
import "../src/stories/Examples/themes/theme-1.css"


const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    options: {
        storySort: {
            order: ['Documentation', "Library", '*'],
          },
        // storySort: (a, b) => {
        //     console.log(a)
        //     return a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true });
        // }
    },
  }
}

export default preview;


export const decorators = [
  withThemeByDataAttribute({
    themes: {
    //   light: 'light',
    //   dark: 'dark',
      headless: 'headless',
      'theme 1': 'theme-1',
      'theme 2': 'theme 2',
    },
    defaultTheme: 'headless',
    attributeName: 'data-mode',
  }),
];


import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia';


const pinia = createPinia();

setup((app) => {
    app.use(pinia)
})