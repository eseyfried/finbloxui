<script setup>
import { mergeProps } from "vue";
import { injectClientCardRootContext } from '../ClientCardRoot.vue'
import { default as Label, LabelProps } from "@/components/Core/Label/Label"

defineProps(mergeProps(LabelProps, {}))
const rootContext = injectClientCardRootContext()
</script>
<template>
    <Label :as-child="asChild" :as="as">
        <slot :label="rootContext.getClient().contact_info?.email.label">
            {{ rootContext.getClient().contact_info?.email.label }}
        </slot>
    </Label>
</template>
