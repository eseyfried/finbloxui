<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :class="['fb-progress-bar', componentClasses.getClassByType('component')]"
        :width="width"
    >
        <g transform="translate(0,0)">
            <rect :width="width"></rect>
        </g>
    </Primitive>
</template>

<script setup>
import * as componentClasses from "@/modules/useCommonCSS";
import { mergeProps } from 'vue';
import { PrimitiveProps, Primitive } from '@/components/Core/Primitive/Primitive';
defineProps(mergeProps(PrimitiveProps, {
    as: {
        type: String,
        default: "svg"
    },
    width: {
        type: [Number,String],
        default: '0',
        desc: "The width of the progress bar."
    }
}))
</script>
<style scoped lang="scss">
.fb-progress-bar {
    height: 5px;
    background-color: var(--fb-chart-color-4);
}
</style>