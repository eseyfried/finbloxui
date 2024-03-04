<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-top-clients-by-fees" :class="componentClasses.getClassByType('component')">
        <table>
            <thead>
                <tr>
                    <th>{{ clientLabel }}</th>
                    <th :colspan="isMobile ? 1 : 2">{{ feesLabel }}</th>
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
                            <td :class="{'fb-top-clients-by-fees-md': !isMobile}">
                                {{ formatters.formatCurrency(data[i]) }}
                            </td>
                            <td v-if="!isMobile">
                                <ProgressBarRoot :width="feesPercentages[i]" class="fb-top-clients-by-fees-bar" />
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
import ProgressBarRoot from "@/components/Core/ProgressBar/ProgressBarRoot"
// vars
const props = defineProps({
    clients: {
        type: Array,
        default: () => [],
        desc: "An array of client or household names"
    },
    data: {
        type: Array,
        default: () => [],
        desc: "An array of total client fee values. Values must be Numeric.",
    },
    clientLabel: {
        type: String,
        default: "Client",
        desc: "A text label for the client column"
    },
    feesLabel: {
        type: String,
        default: "Total Fees",
        desc: "A text label for the fee column"
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
    .fb-top-clients-by-fees-md {
        text-align: right;
    }
    .fb-top-clients-by-fees-bar {
        margin-left: 10px;
    }
}
// @for $i from 1 through 100 {
//   .percentage-#{$i} {
//     $value: ($i * 1%);
//     width: $value;
//   }
// }

</style>