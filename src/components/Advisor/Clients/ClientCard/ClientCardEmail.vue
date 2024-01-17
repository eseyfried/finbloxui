<script setup>
import { mergeProps } from "vue";
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'
import ClientCardEmailLabel from './ClientCardEmailLabel.vue';
import ClientCardEmailLink from './ClientCardEmailLink.vue';

defineProps(mergeProps(PrimitiveProps, {}))

</script>
<template>
 <Primitive
    ref="primitiveElement" :as-child="asChild" :as="as">
    <slot>
        <ClientCardEmailLabel />
        <ClientCardEmailLink />
    </slot>
 </Primitive>
</template>