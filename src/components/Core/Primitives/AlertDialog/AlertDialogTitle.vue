<script>
import { mergeProps } from "vue"
import { DialogTitleProps } from '@/components/Core/Primitives/Dialog/DialogTitle'

export const AlertDialogTitleProps = mergeProps(DialogTitleProps, {})
</script>

<script setup>
import { DialogTitle } from '@/components/Core/Primitives/Dialog'

const props = defineProps(AlertDialogTitleProps)
</script>

<template>
  <DialogTitle v-bind="props">
    <slot />
  </DialogTitle>
</template>