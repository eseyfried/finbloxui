<script>
import { mergeProps } from "vue"
import { DialogCloseProps } from '@/components/Core/Primitives/Dialog/DialogClose'

export const AlertDialogCancelProps = mergeProps(DialogCloseProps, {})
</script>

<script setup>
import { onMounted } from 'vue'
import { injectAlertDialogContentContext } from './AlertDialogContent.vue'
import { DialogClose } from '@/components/Core/Primitives/Dialog'
import { usePrimitiveElement } from '@/components/Core/Primitives/Primitive'

const props = defineProps(AlertDialogCancelProps)
const contentContext = injectAlertDialogContentContext()
const { primitiveElement, currentElement } = usePrimitiveElement()

onMounted(() => {
  contentContext.onCancelElementChange(currentElement.value)
})
</script>

<template>
  <DialogClose v-bind="props" ref="primitiveElement">
    <slot />
  </DialogClose>
</template>