<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-top-clients-by-fees" :class="componentClasses.getClassByType('component')">
        <table>
            <thead>
                <tr>
                    <th>{{ clientLabel }}</th>
                    <th>{{ feesLabel }}</th>
                </tr>
            </thead>
            
            <tbody>
                <template v-for="(client, i) in clients" :key="i">
                    <slot
                        v-if="feesPercentages[i] >= 1"
                        :props="props"
                        :feesPercentStyle="{ 'style': `width: ${feesPercentages[i]}%`}"
                        :feesPercent="feesPercentages[i]"
                        :feesAmount="formatters.formatCurrency(data[i])"
                        :client="client"
                    >
                        <tr>
                            <td>{{ client }}</td>
                            <td>
                                <span :class="{'fb-top-clients-by-fees-md': !isMobile}">{{ formatters.formatCurrency(data[i]) }}</span>
                                <div v-if="!isMobile" class="fb-top-clients-by-fees-bar-container">
                                    <div class="fb-top-clients-by-fees-bar percentage" :style="`width: ${feesPercentages[i]}%;`"></div>
                                </div>
                            </td>
                        </tr>
                    </slot>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script setup>
// imports
import * as componentClasses from "@/modules/useCommonCSS";
import { computed } from "vue";
import { arraySum } from "@/modules/useArrayUtils";
import { isMobile } from "@/modules/useResponsive";
import * as formatters from "@/modules/useFormatter";

// vars
const props = defineProps({
    clients: {
        type: Array,
        default: () => []
    },
    data: {
        type: Array,
        default: () => []
    },
    clientLabel: {
        type: String,
        default: "Client"
    },
    feesLabel: {
        type: String,
        default: "Total Fees"
    }
});


const feesPercentages = computed(() => {
    if (props.data.length) {
        const feesTotal = arraySum(props.data);
        return props.data.map(item => {
            return (100 * parseFloat(item) / feesTotal) * 2.5;
        })
    }
    return [];
});



// methods

</script>
<style lang="scss" scoped>
@import "../../../../scss/finbloxui.scss";
table {
    width: 100%;
    th:first-child {
        text-align: left;
    }
}
table::v-deep(tr) {
    .fb-top-clients-by-fees-bar-container {
        display: contents;
    }
    .fb-top-clients-by-fees-md {
        display: inline-block;
        width: 30%;
        text-align: right;
    }
    .fb-top-clients-by-fees-bar {
        height: 10px;
        display: inline-block;
        background-color: var(--fb-chart-color-4);
    }
}
// @for $i from 1 through 100 {
//   .percentage-#{$i} {
//     $value: ($i * 1%);
//     width: $value;
//   }
// }

</style>