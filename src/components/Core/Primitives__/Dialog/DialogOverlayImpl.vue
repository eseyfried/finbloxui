<script>
import { mergeProps } from "vue"
import { Primitive, PrimitiveProps } from '@/components/Core/Primitives/Primitive'
export const DialogOverlayImplProps = mergeProps(PrimitiveProps, {})
</script>
<script setup>

import { injectDialogRootContext } from './DialogRoot.vue'

import { useBodyScrollLock } from '@/modules/shared'

defineProps(mergeProps(DialogOverlayImplProps, {}))
const rootContext = injectDialogRootContext()

useBodyScrollLock(true)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    style="pointer-events: auto"
  >
    <slot />
  </Primitive>
</template>