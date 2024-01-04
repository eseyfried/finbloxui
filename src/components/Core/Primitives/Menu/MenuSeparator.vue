<script>
import { mergeProps } from "vue"
import { PrimitiveProps } from '@/components/Core/Primitives/Primitive'

export const MenuSeparatorProps = mergeProps(PrimitiveProps, {})
</script>

<script setup>
import { Primitive } from '@/components/Core/Primitives/Primitive'

const props = defineProps(MenuSeparatorProps)
</script>

<template>
  <Primitive v-bind="props" role="separator" aria-orientation="horizontal">
    <slot />
  </Primitive>
</template>