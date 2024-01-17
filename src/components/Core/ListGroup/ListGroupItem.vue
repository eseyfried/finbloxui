<script>

</script>
<script setup>
import { mergeProps } from "vue";
import { injectListGroupRootContext } from './ListGroupRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'li'
  }
}))
const rootContext = injectListGroupRootContext()
</script>
<template>
 <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
    <slot />
 </Primitive>
</template>