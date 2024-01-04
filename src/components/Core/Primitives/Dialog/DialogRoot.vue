<script>
import { createContext, useId } from '@/modules/shared'


export const DialogRootEmits = ['update:open'];
export const DialogRootProps = {
  open: {
    type: Boolean,
    default: false
  },
  defaultOpen: {
    type: Boolean,
    default: false
  },
  modal: {
    type: Boolean,
    default: true
  },
};


export const [injectDialogRootContext, provideDialogRootContext] = createContext('DialogRoot');
</script>

<script setup>
import { ref, toRefs } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps(DialogRootProps)

const emit = defineEmits(DialogRootEmits);

// const open = useVModel(props, 'open', emit, {
//   defaultValue: props.defaultOpen,
//   passive: (props.open === undefined),
// });
const open = ref()

const triggerElement = ref()
const contentElement = ref()
const { modal } = toRefs(props)

provideDialogRootContext({
  open,
  modal,
  openModal: () => {
    open.value = true
  },
  onOpenChange: (value) => {
    open.value = value
  },
  onOpenToggle: () => {
    open.value = !open.value
  },
  contentId: useId(),
  titleId: useId(),
  descriptionId: useId(),
  triggerElement,
  contentElement,
})
</script>

<template>
  <slot />
</template>