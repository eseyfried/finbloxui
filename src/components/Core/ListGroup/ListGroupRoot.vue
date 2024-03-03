<script>
import { mergeProps, } from 'vue';
import { PrimitiveProps } from '@/components/Core/Primitive/Primitive';
import { createContext } from '@/modules/shared';
import * as componentClasses from "@/modules/useCommonCSS";
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
import { Primitive } from '@/components/Core/Primitive/Primitive';

defineProps(ListGroupRootProps)


defineEmits([]);


provideListGroupRootContext({});


</script>
<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :class="['fb-list-group', componentClasses.getClassByType('component')]"
    >
        <slot />
    </Primitive>
</template>