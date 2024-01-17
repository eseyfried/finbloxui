<script setup>
import { mergeProps } from "vue";
import { injectClientCardRootContext } from './ClientCardRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'span'
  },
  index: {
    type: String
  }
}))
const rootContext = injectClientCardRootContext()
</script>
<template>
 <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
    <slot :value="rootContext.getClient().stats[index].value">
        <template v-if="index?.toString() && index !== null">
            {{ rootContext.getClient().stats[index].value }}
        </template>
    </slot>
 </Primitive>
</template>