<script>
import { createContext } from '@/modules/shared'


export const [injectPopperRootContext, providePopperRootContext]
  = createContext('PopperRoot')
</script>

<script setup>
import { ref } from 'vue'

const anchor = ref()

providePopperRootContext({
  anchor,
  onAnchorChange: element => anchor.value = element,
})
</script>

<template>
  <slot />
</template>