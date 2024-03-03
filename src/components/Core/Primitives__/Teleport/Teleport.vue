<script>
export const TeleportProps = {
  to: {
    type: String,
    default: "body"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  forceMount: {
    type: Boolean,
    default: false
  }
}
</script>

<script setup>
import { useMounted } from '@vueuse/core'

defineProps(TeleportProps)

const isMounted = useMounted()
</script>

<template>
  <Teleport v-if="isMounted || forceMount" :to="to" :disabled="disabled">
    <slot />
  </Teleport>
</template>