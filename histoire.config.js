import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'


const logo = '/src/assets/logo-400.png'
const env = process.env.HISTOIRE_ENV || 'development'
console.log("histoire %s", env)


export default defineConfig({
    outDir: 'dist/histoire',
    setupFile: '.histoire/histoire.setup.js',
    plugins: [
        HstVue(),
        {
            name: 'builtin:tailwind-tokens', // turn off default tailwind design systems
        },
    ],
    tree: {
        groups: [
            {
                id: 'top',
                title: 'Overview',
            },
            {
                id: 'guides',
                title: 'Guides',
                // include: file => /(?:Guide)/g.test(file.title),
                include: file => file.title.includes("Guide"),
            },
            {
                title: 'Components',
                include: file => !file.title.includes('Serialize'),
            },
        ],
    },
    theme: {
        title: 'FinBlox-UI',
        logo: {
          square: logo,
          light: logo,
          dark: logo
        },
        // logoHref: 'https://acme.com',
        // favicon: './favicon.ico',
    },
    vite: {
        base: env === 'development' ? '/' : '/docs/',
    },
})