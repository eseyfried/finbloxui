<script>
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'
export const ListGroupItemProps = mergeProps(PrimitiveProps, {
    as: {
        type: String,
        default: "li"
    }
})
</script>
<script setup>
import { mergeProps } from "vue";
import { injectListGroupRootContext } from './ListGroupRoot.vue'


defineProps(ListGroupItemProps)
const rootContext = injectListGroupRootContext()
</script>
<template>
 <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
    <slot />
 </Primitive>
</template>