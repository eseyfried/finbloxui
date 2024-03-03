<script>
import { mergeProps } from "vue"
export const DialogDescriptionProps = mergeProps(PrimitiveProps, { 
    as:{
        type: String,
        default: 'p' 
    }
})
</script>
<script setup>
import { injectDialogRootContext } from './DialogRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitives/Primitive'

const props = defineProps(DialogDescriptionProps)
const rootContext = injectDialogRootContext()
</script>

<template>
  <Primitive v-bind="props" :id="rootContext.descriptionId">
    <slot />
  </Primitive>
</template>