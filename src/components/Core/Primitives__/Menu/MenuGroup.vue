<script>
import { mergeProps } from "vue"
import { PrimitiveProps } from '@/components/Core/Primitives/Primitive'

export const MenuGroupProps = mergeProps(PrimitiveProps, {})
</script>

<script setup>
import { Primitive } from '@/components/Core/Primitives/Primitive'

const props = defineProps(MenuGroupProps)
</script>

<template>
  <Primitive role="group" v-bind="props">
    <slot />
  </Primitive>
</template>