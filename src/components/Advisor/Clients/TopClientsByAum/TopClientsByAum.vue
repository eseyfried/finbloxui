<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-top-clients-by-aum">
        <table>
            <thead>
                <tr>
                    <th>{{ clientLabel }}</th>
                    <th>{{ aumLabel }}</th>
                </tr>
            </thead>
            
            <tbody>
                <template v-for="(client, i) in clients" :key="i">
                    <slot
                        v-if="aumPercentages[i] >= 1"
                        :props="props"
                        :aumPercentStyle="{ 'style': `width: ${aumPercentages[i]}%`}"
                        :aumPercent="aumPercentages[i]"
                        :aumAmount="formatters.formatCurrency(data[i])"
                        :client="client"
                    >
                        <tr>
                            <td>{{ client }}</td>
                            <td>
                                <span :class="{'fb-top-clients-by-aum-md': !isMobile}">{{ formatters.formatCurrency(data[i]) }}</span>
                                <div v-if="!isMobile" class="fb-top-clients-by-aum-bar-container">
                                    <div class="fb-top-clients-by-aum-bar percentage" :style="`width: ${aumPercentages[i]}%;`"></div>
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
    aumLabel: {
        type: String,
        default: "Total Assets Under Management"
    }
});


const aumPercentages = computed(() => {
    if (props.data.length) {
        const aumTotal = arraySum(props.data);
        return props.data.map(item => {
            return (100 * parseFloat(item) / aumTotal) * 2.5;
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
    .fb-top-clients-by-aum-bar-container {
        display: contents;
    }
    .fb-top-clients-by-aum-md {
        display: inline-block;
        width: 30%;
        text-align: right;
    }
    .fb-top-clients-by-aum-bar {
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