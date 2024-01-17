<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mergeProps } from "vue";
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/'

defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String
  }
}))
</script>
<template>
 <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
    <slot />
 </Primitive>
</template>