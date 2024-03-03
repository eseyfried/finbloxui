<script setup>
import { mergeProps } from "vue";
import { injectClientCardRootContext } from '../ClientCardRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

const props = defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'a'
  },
}))
const rootContext = injectClientCardRootContext()
</script>
<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :href="props.as === 'a' ? '#' : null"
        @click.prevent="rootContext.handleActionClick($event)"
    >
        <slot :actionLabel="rootContext.actionLabel">
            {{ rootContext.actionLabel }}
        </slot>
    </Primitive> 
</template>