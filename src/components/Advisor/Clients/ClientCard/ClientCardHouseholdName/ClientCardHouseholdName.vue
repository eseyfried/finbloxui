<script>

</script>
<script setup>
import { mergeProps } from "vue";
import { injectClientCardRootContext } from '../ClientCardRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'h3'
  }
}))

const rootContext = injectClientCardRootContext()



</script>
<template>
 <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
    <slot :household="rootContext.getClient().name?.household">
        {{ rootContext.getClient().name?.household }}
    </slot>
 </Primitive>
</template>