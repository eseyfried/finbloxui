import { fileURLToPath, URL } from 'node:url';
import { resolve } from "path";
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: [".vue", ".js", ".json", ".scss", ".css"],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: "dist/lib",
    lib: {
      // src/indext.js is where we have exported the component(s)
      entry: resolve(__dirname, "src/lib/index.js"),
      name: "FinbloxUIComponentLibrary",
      // the name of the output files when the build is run
      fileName: "finblox-ui",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
