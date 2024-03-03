<script setup>
import { DialogOverlay } from '@/components/Core/Primitives/Dialog'
import { DialogOverlayProps } from '@/components/Core/Primitives/Dialog/DialogOverlay'

const props = defineProps(DialogOverlayProps)
</script>

<template>
  <DialogOverlay v-bind="props">
    <slot />
  </DialogOverlay>
</template>