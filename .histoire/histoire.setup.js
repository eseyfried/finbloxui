import { createPinia } from 'pinia'
import { defineSetupVue3 } from '@histoire/plugin-vue'
import WrapperGlobal from '@/../.histoire/components/GlobalWrapper.vue'

import "../src/assets/fontawesome/css/fontawesome.css";
import "../src/assets/fontawesome/css/brands.css";
import "../src/assets/fontawesome/css/solid.css";

export const setupVue3 = defineSetupVue3(({ app, story, variant, addWrapper }) => {
    addWrapper(WrapperGlobal)
    // Vue plugin
    app.use(createPinia())
    // Global component
    // app.component('GlobalComponent', MyGlobalComponent)
  
    // Global property
    // app.config.globalProperties.$t = (key) => translate(key)
  
    // Provide
    // app.provide('key', 'meow')
  })