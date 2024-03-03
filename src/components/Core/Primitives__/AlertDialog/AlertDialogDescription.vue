<script>
import { mergeProps } from "vue"
import { DialogDescriptionProps } from '@/components/Core/Primitives/Dialog/DialogDescription'

export const AlertDialogDescriptionProps = mergeProps(DialogDescriptionProps, {})
</script>

<script setup>
import { DialogDescription } from '@/components/Core/Primitives/Dialog/'

const props = defineProps(AlertDialogDescriptionProps)
</script>

<template>
  <DialogDescription v-bind="props">
    <slot />
  </DialogDescription>
</template>