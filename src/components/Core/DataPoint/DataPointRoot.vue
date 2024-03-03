<script>
import { mergeProps, computed, toRef, reactive } from 'vue';
import { PrimitiveProps } from '@/components/Core/Primitive/Primitive';
import { createContext } from '@/modules/shared';
export const DataPointRootProps = mergeProps(PrimitiveProps, {
    dataPoint: {
        type: Object,
        default: () => {
            return {
                label: null,
                value: null,
                format: null,
                trend: {
                    value: null,
                    format: null,
                    direction: null,
                }
            }
        },
    },
    showAction: {
        type: Boolean,
        default: true
    },
    actionLabel: {
        type: String,
        default: "show more"
    }
})

export const [injectDataPointRootContext, provideDataPointRootContext]
  = createContext('DataPointRoot')
</script>
<script setup>
import * as formatters from "@/modules/useFormatter";
import * as componentClasses from "@/modules/useCommonCSS";
import { Primitive } from '@/components/Core/Primitive/Primitive';

import DataPointLabel from '@/components/Core/DataPoint/DataPointLabel';
import DataPointValue from '@/components/Core/DataPoint/DataPointValue';
import DataPointTrend from '@/components/Core/DataPoint/DataPointTrend';
import DataPointAction from '@/components/Core/DataPoint/DataPointAction';

const props = defineProps(DataPointRootProps)


const emit = defineEmits([
    'fb-client-card-details-link:click',
    'fb-client-card-contact-link:click',
]);

const applyFormat = (value, format) => {
    if (typeof format === "function") {
        return format(value);
    }
    switch (format) {
        case "currency":
            return formatters.formatCurrency(value);
        case "percent":
            return formatters.formatPercent(value);
        default:
            return value;
    }
}

const transformedDataPoint = computed(() => {
    return {
        ...props.dataPoint,
        value: applyFormat(props.dataPoint.value, props.dataPoint.format),
        trend: {
            ...props.dataPoint.trend,
            value: applyFormat(props.dataPoint.trend.value, props.dataPoint.trend.format),
        }

    }
});


const handleActionClick = () => {
    emit("fb-data-point-action-link:click", props.dataPoint);
}

provideDataPointRootContext(reactive({
    dataPoint: toRef(transformedDataPoint),
    handleActionClick: handleActionClick,
    showAction: toRef(props, 'showAction'),
    actionLabel: toRef(props, 'actionLabel')
}));


</script>
<template>
    <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
        <slot>
            <div class="fb-data-point" :class="componentClasses.getClassByType('component')">
                <div class="fb-data-point-body">
                    <DataPointLabel />
                    <DataPointValue />
                    <DataPointTrend class="fb-data-point-trend" />
                </div>
                <div class="fb-data-point-footer" v-if="showAction">
                    <DataPointAction />
                </div>
            </div>
        </slot>
    </Primitive>
</template>