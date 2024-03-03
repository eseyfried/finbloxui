<script>
import { mergeProps } from "vue"
export const DialogTitleProps = mergeProps(PrimitiveProps, { 
    as:{
        type: String,
        default: 'h2' 
    }
})
</script>
<script setup>
import { injectDialogRootContext } from './DialogRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitives/Primitive'

const props = defineProps(DialogTitleProps)
const rootContext = injectDialogRootContext()
</script>

<template>
  <Primitive v-bind="props" :id="rootContext.titleId">
    <slot />
  </Primitive>
</template>