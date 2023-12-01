import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ['./vitest.setup.js'],
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      threads: false,
      transformMode: {
        web: [/\.[jt]sx$/],
      },
      coverage: {
        enabled: false
      },
      deps: {
        inline: ['vitest-canvas-mock'],
      },
      environmentOptions: {
        jsdom: {
          resources: 'usable',
        },
      },
    }
  })
)
