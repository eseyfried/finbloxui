<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { mergeProps } from "vue";
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'
export const LabelProps = mergeProps(PrimitiveProps, {
    as: {
        type: String,
        default: "label"
    }
})
</script>
<script setup>
defineProps(LabelProps)

</script>
<template>
 <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
    <slot />
 </Primitive>
</template>