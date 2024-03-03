<script>

</script>
<script setup>
import { mergeProps } from "vue";
import { injectClientCardRootContext } from '../ClientCardRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'h2'
  }
}))
const rootContext = injectClientCardRootContext()

</script>
<template>
 <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
    <slot
        :first_name="rootContext.getClient().name?.first_name"
        :last_name="rootContext.getClient().name?.last_name"
    >
        {{ rootContext.getClient().name?.first_name }} {{ rootContext.getClient().name?.last_name }}
    </slot>
 </Primitive>
</template>