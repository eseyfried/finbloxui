<script>

</script>
<script setup>
import { mergeProps } from "vue";
import { injectDataPointRootContext } from './DataPointRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

const props = defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'a'
  },
}))
const rootContext = injectDataPointRootContext()
</script>
<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :href="props.as === 'a' ? '#' : null"
        @click.prevent="rootContext.handleActionClick($event)"
    >
        <slot>
            {{ rootContext.getActionLabel() }}
        </slot>
    </Primitive> 
</template>