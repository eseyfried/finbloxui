<script setup>
import { mergeProps } from "vue";
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'


import ClientCardEmailLabel from '@/components/Advisor/Clients/ClientCard/ClientCardEmailLabel/ClientCardEmailLabel.vue'
import ClientCardEmailLink from '@/components/Advisor/Clients/ClientCard/ClientCardEmailLink/ClientCardEmailLink.vue'

defineProps(mergeProps(PrimitiveProps, {}))
</script>
<template>
 <Primitive
    ref="primitiveElement"
    :as-child="asChild"
    :as="as"
>
    <slot>
        <ClientCardEmailLabel />
        <ClientCardEmailLink />
    </slot>
 </Primitive>
</template>