<script>
import { mergeProps, } from 'vue';
import { PrimitiveProps } from '@/components/Core/Primitive';
import { createContext } from '@/modules/shared';
export const ListGroupRootProps = mergeProps(PrimitiveProps, {
    as: {
        type: String,
        default: "ul"
    }
})

export const [injectListGroupRootContext, provideListGroupRootContext]
  = createContext('ListGroupRoot')
</script>
<script setup>
import { Primitive } from '@/components/Core/Primitive';

defineProps(ListGroupRootProps)


defineEmits([]);


provideListGroupRootContext({});


</script>
<template>
    <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
        <slot />
    </Primitive>
</template>