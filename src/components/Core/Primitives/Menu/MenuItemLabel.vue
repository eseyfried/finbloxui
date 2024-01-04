<script>
import { mergeProps } from "vue"
import { PrimitiveProps } from '@/components/Core/Primitives/Primitive'

export const MenuLabelProps = mergeProps(PrimitiveProps, {
    as: {
        type: String,
        default: 'div'
    }
})
</script>

<script setup>
import { Primitive } from '@/components/Core/Primitives/Primitive'

const props = defineProps(MenuLabelProps)
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>