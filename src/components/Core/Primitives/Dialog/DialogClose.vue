<script>
import { mergeProps } from "vue"
export const DialogCloseProps = mergeProps(PrimitiveProps, { 
    as:{
        type: String,
        default: 'button' 
    }
})
</script>
<script setup>
import { injectDialogRootContext } from './DialogRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitives/Primitive'

const props = defineProps(DialogCloseProps)

const rootContext = injectDialogRootContext()
</script>

<template>
  <Primitive
    v-bind="props"
    :type="as === 'button' ? 'button' : undefined"
    @click="rootContext.onOpenChange(false)"
  >
    <slot />
  </Primitive>
</template>