<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mergeProps } from "vue";
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'
import * as componentClasses from "@/modules/useCommonCSS";

defineProps(mergeProps(PrimitiveProps, {}))
</script>
<template>
 <Primitive
    ref="primitiveElement"
    :as-child="asChild"
    :as="as"
    :class="['fb-container', componentClasses.getClassByType('component')]"
>
    <slot />
 </Primitive>
</template>