<script>
import { PrimitiveProps } from '@/components/Core/Primitive';
import { mergeProps } from 'vue'
import { createContext, useId } from '@/modules/shared'

export const CollapsibleRootProps = mergeProps(PrimitiveProps, {
    defaultOpen: {
        type: Boolean,
        default: false
    },
    open: {
        type: Boolean,
        default: false
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
import { Primitive } from '@/components/Core/Primitive';
import { useVModel } from '@vueuse/core';
import * as componentClasses from "@/modules/useCommonCSS";

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
    :class="['fb-collapsible', componentClasses.getClassByType('component')]"
  >
    <slot :open="open" />
  </Primitive>
</template>