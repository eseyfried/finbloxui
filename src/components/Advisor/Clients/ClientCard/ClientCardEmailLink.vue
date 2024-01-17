<script setup>
import { mergeProps } from "vue";
import { injectClientCardRootContext } from './ClientCardRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

defineProps(mergeProps(PrimitiveProps, {
    as: {
        type: String,
        default: 'a'
    }
}))
const rootContext = injectClientCardRootContext()
</script>
<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :href="`mailto:${rootContext.getClient().contact_info?.email.value}`"
        @click.prevent="rootContext.handleEmailClick()"
    >
        <slot :email="rootContext.getClient().contact_info?.email.value">
            {{ rootContext.getClient().contact_info?.email.value }}
        </slot>
    </Primitive>
</template>
