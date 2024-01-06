<script>

</script>
<script setup>
import { mergeProps } from "vue";
import { injectDataPointRootContext } from './DataPointRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'span'
  }
}))
const rootContext = injectDataPointRootContext()
</script>
<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :data-trend-direction="rootContext.dataPoint.trend.direction"
    >
        <slot>
            {{ rootContext.dataPoint.trend.value }}
        </slot>
    </Primitive>
</template>