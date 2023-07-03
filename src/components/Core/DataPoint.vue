<template>
    <div class="fb-data-point">
        <div class="fb-data-point-body">
            <slot :dataPoint="transformedDataPoint" :props="props">
                <h3>{{ transformedDataPoint.label }}</h3>
                <h4>{{ transformedDataPoint.value }}</h4>
            </slot>
            <slot name="trend" :dataPoint="transformedDataPoint" :props="props" v-if="dataPoint.trend">
                <span
                    class="fb-data-point-trend"
                    :data-trend-direction="transformedDataPoint.trend.direction"
                >
                    {{ transformedDataPoint.trend.value }}
                </span>
            </slot>
        </div>
        <div class="fb-data-point-footer" v-if="showDetailsLink">
            <slot name="footer" :dataPoint="transformedDataPoint" :props="props">
                <a href="#" @click.prevent="handleDetailsLinkClick($event)">{{ detailsLinkLabel }}</a>
            </slot>
        </div>
    </div>
</template>
<script setup>
import * as formatters from "@/modules/useFormatter";
import { computed } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
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
    showDetailsLink: {
        type: Boolean,
        default: true,
    },
    detailsLinkLabel: {
        type: String,
        default: "Show more",
    },
});

const emit = defineEmits([
    'fb-data-point-details-link:click',
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

const handleDetailsLinkClick = () => {
    emit("fb-data-point-details-link:click", props.dataPoint);
}
</script>
<style lang="scss" scoped>

</style>