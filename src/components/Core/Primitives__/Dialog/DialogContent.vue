<script>
import { mergeProps } from "vue";
import {
  DialogContentImplEmits,
  DialogContentImplProps,
} from './DialogContentImpl.vue'

export const DialogContentEmits = DialogContentImplEmits

export const DialogContentProps = mergeProps(DialogContentImplProps, {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount: {
    type: Boolean,
    default: false // default to false
  }
})
</script>

<script setup>
import DialogContentModal from './DialogContentModal.vue'
import DialogContentNonModal from './DialogContentNonModal.vue'
import { injectDialogRootContext } from './DialogRoot.vue'
import { Presence } from '@/components/Core/Primitives/Presence'
import { useEmitAsProps } from '@/modules/shared'

const props = defineProps(DialogContentProps)
const emits = defineEmits(DialogContentEmits)

const rootContext = injectDialogRootContext()

const emitsAsProps = useEmitAsProps(emits)

</script>

<template>
  <Presence :present="forceMount || rootContext.open.value">
    <DialogContentModal
      v-if="rootContext.modal.value"
      v-bind="{ ...props, ...emitsAsProps, ...$attrs }"
      @open-auto-focus="emits('openAutoFocus', $event)"
    >
      <slot />
    </DialogContentModal>
    <DialogContentNonModal
      v-else
      v-bind="{ ...props, ...emitsAsProps, ...$attrs }"
    >
      <slot />
    </DialogContentNonModal>
  </Presence>
</template>