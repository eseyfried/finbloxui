/** @type { import('@storybook/vue3').Preview } */
import { withThemeByDataAttribute } from '@storybook/addon-styling';
import DocumentationTemplate from './DocumentationTemplate.mdx';

import "tailwindcss/tailwind.css";
import "./global.css";
import "../src/assets/fontawesome/css/fontawesome.css";
import "../src/assets/fontawesome/css/brands.css";
import "../src/assets/fontawesome/css/solid.css";
import "../src/stories/Examples/preFlight.scss"
import "../src/stories/Examples/themes/theme-1.css"
// import "../src/stories/Examples/themes/theme-2.css"




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
    },
    docs: {
        // page: DocumentationTemplate,
    },
  }
}

export default preview;

const myDecorator = (getStory, context, { options, parameters }) => {
       const theme = context.options.theme
       return 
}




export const decorators = [
  withThemeByDataAttribute({
    themes: {
    //   light: 'light',
    //   dark: 'dark',
      headless: 'headless',
      'theme 1': 'theme-1',
      'theme 2': 'theme-2',
    },
    defaultTheme: 'headless',
    attributeName: 'data-mode',
  }),
  (story, ctx) => {
    const className = ctx.parameters?.decoratorName || "headless"
    return {
        components: { story },
        template: `<div class="${className}"><story /></div>`,
    }},
];


import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia';
import { useClientData } from "@/stories/modules/useClientData";


const pinia = createPinia();

setup((app) => {
    app.use(pinia)
})