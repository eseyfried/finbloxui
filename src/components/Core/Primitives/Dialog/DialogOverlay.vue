<script>
import { mergeProps } from "vue"
export const DialogOverlayProps = mergeProps(DialogOverlayImplProps, {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with Vue animation libraries.
     */
    forceMount: {
        type: Boolean,
        default: false
    }
})
</script>
<script setup>

import { injectDialogRootContext } from './DialogRoot.vue'
import DialogOverlayImpl, { DialogOverlayImplProps } from './DialogOverlayImpl.vue'
import { Presence } from '@/components/Core/Primitives/Presence'

defineProps(DialogOverlayProps)
const rootContext = injectDialogRootContext()
</script>

<template>
  <Presence v-if="rootContext?.modal.value" :present="forceMount || rootContext.open.value">
    <DialogOverlayImpl :as="as" :as-child="asChild" v-bind="$attrs">
      <slot />
    </DialogOverlayImpl>
  </Presence>
</template>