<script setup>
import { mergeProps } from "vue";
import { injectClientCardRootContext } from './ClientCardRoot.vue'
import { PrimitiveProps } from '@/components/Core/Primitive/Primitive'
import { Label } from "@/components/Core/Label/"

defineProps(mergeProps(PrimitiveProps, {}))
const rootContext = injectClientCardRootContext()
</script>
<template>
    <Label :as-child="asChild" :as="as">
        <slot :label="rootContext.getClient().contact_info?.email.label">
            {{ rootContext.getClient().contact_info?.email.label }}
        </slot>
    </Label>
</template>
