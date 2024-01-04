<script>
import { mergeProps } from "vue"
import { DialogCloseProps } from '@/components/Core/Primitives/Dialog/DialogClose'

export const AlertDialogActionProps = mergeProps(DialogCloseProps, {})
</script>

<script setup>
import { DialogClose } from '@/components/Core/Primitives/Dialog'

const props = defineProps(AlertDialogActionProps)
</script>

<template>
  <DialogClose v-bind="props">
    <slot />
  </DialogClose>
</template>