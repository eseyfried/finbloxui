<script>
import {
  DialogContentEmits,
  DialogContentProps,
} from '@/components/Core/Primitives/Dialog/DialogContent'
import { createContext, useEmitAsProps } from '@/modules/shared'


export const [injectAlertDialogContentContext, provideAlertDialogContentContext]
  = createContext('AlertDialogContent')

export const AlertDialogContentEmits = DialogContentEmits
export const AlertDialogContentProps = DialogContentProps
</script>

<script setup>
import { nextTick, ref } from 'vue'
import {
  DialogContent,
} from '@/components/Core/Primitives/Dialog'

const props = defineProps(AlertDialogContentProps)
const emits = defineEmits(AlertDialogContentEmits)

const emitsAsProps = useEmitAsProps(emits)

const cancelElement = ref()

provideAlertDialogContentContext({
  onCancelElementChange: (el) => {
    cancelElement.value = el
  },
})
</script>

<template>
  <DialogContent
    v-bind="{ ...props, ...emitsAsProps }"
    role="alertdialog"
    @pointer-down-outside.prevent
    @interact-outside.prevent
    @open-auto-focus="
      () => {
        nextTick(() => {
          cancelElement?.focus({
            preventScroll: true,
          });
        });
      }
    "
  >
    <slot />
  </DialogContent>
</template>