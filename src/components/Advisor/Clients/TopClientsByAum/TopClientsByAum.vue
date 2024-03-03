<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-top-clients-by-aum" :class="componentClasses.getClassByType('component')">
        <table>
            <thead>
                <tr>
                    <th>{{ clientLabel }}</th>
                    <th :colspan="isMobile ? 1 : 2">{{ aumLabel }}</th>
                </tr>
            </thead>
            
            <tbody>
                <template v-for="(client, i) in clients" :key="i">
                    <slot
                        v-if="aumPercentages[i] >= 1"
                        :props="props"
                        :aumPercent="aumPercentages[i]"
                        :aumAmount="formatters.formatCurrency(data[i])"
                        :client="client"
                    >
                        <tr>
                            <td>{{ client }}</td>
                            <td :class="{'fb-top-clients-by-aum-md': !isMobile}">
                                {{ formatters.formatCurrency(data[i]) }}
                            </td>
                            <td v-if="!isMobile">
                                <ProgressBarRoot :width="aumPercentages[i]" class="fb-top-clients-by-aum-bar" />
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
        desc: "An array of total client AUM values. Values must be Numeric.",
    },
    clientLabel: {
        type: String,
        default: "Client",
        desc: "A text label for the client column"
    },
    aumLabel: {
        type: String,
        default: "Total Assets Under Management",
        desc: "A text label for the AUM column"
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
    .fb-top-clients-by-aum-md {
        text-align: right;
    }
    .fb-top-clients-by-aum-bar {
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