<script>

import { createContext } from '@/modules/shared'

export const [injectConfigProviderContext, provideConfigProviderContext]
  = createContext('ConfigProvider');
</script>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  /**
   * The global reading direction of your application. This will be inherited by all primitives.
   * @defaultValue 'ltr'
   */
  dir: {
    type: String,
    default: "ltr"
  },
  /**
   * The global scroll body behavior of your application. This will be inherited by the related primitives.
   * @type boolean | ScrollBodyOption
   */
  scrollBody: {
    type: Boolean,
    default: true
  }
})

const { dir, scrollBody } = toRefs(props)

provideConfigProviderContext({
  dir,
  scrollBody,
})
</script>

<template>
  <slot />
</template>