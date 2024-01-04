<script>
import { PrimitiveProps } from '@/components/Core/Primitives/Primitive';
import { mergeProps, ref } from 'vue'
import { createContext, useId } from '@/modules/shared'

export const CollapsibleRootProps = mergeProps(PrimitiveProps, {
    defaultOpen: {
        type: Boolean,
        default: false
    },
    open: {
        type: Boolean,
        default: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

export const CollapsibleRootEmits = ['update:open']



export const [injectCollapsibleRootContext, provideCollapsibleRootContext] = createContext('CollapsibleRoot')
</script>

<script setup>
import { Primitive } from '@/components/Core/Primitives/Primitive';
import { useVModel } from '@vueuse/core';

const props = defineProps(CollapsibleRootProps);


const emit = defineEmits(CollapsibleRootEmits)
const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined),
})


const disabled = useVModel(props, 'disabled')


provideCollapsibleRootContext({
  contentId: useId(),
  disabled,
  open,
  onOpenToggle: () => {
    open.value = !open.value
    
  },
})

defineExpose({ open })

</script>

<template>
  <Primitive
    :as="as"
    :as-child="props.asChild"
    :data-state="props.open ? 'open' : 'closed'"
    :data-disabled="props.disabled ? '' : undefined"
  >
    <slot :open="open" />
  </Primitive>
</template>