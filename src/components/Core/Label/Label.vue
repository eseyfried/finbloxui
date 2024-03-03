<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { mergeProps } from "vue";
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'
import * as componentClasses from "@/modules/useCommonCSS";
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
 <Primitive
    ref="primitiveElement"
    :as-child="asChild"
    :as="as"
    :class="['fb-label', componentClasses.getClassByType('component')]"
>
    <slot />
 </Primitive>
</template>