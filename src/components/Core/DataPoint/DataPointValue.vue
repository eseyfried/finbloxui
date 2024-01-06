<script>

</script>
<script setup>
import { mergeProps } from "vue";
import { injectDataPointRootContext } from './DataPointRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'h4'
  }
}))
const rootContext = injectDataPointRootContext()
</script>
<template>
 <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
    <slot>
        {{ rootContext.dataPoint.value }}
    </slot>
 </Primitive>
</template>