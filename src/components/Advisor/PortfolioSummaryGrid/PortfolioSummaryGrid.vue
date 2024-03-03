<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        class="fb-portfolio-summary-grid"
        :class="componentClasses.getClassByType('component')"
    >
        <MobileFilters :slots="slots" />
        <DataTable v-if="portfolio.length > 0" :rows="portfolio" v-bind="defaultDataTableOptions" teleportTo=".fb-portfolio-summary-grid" :showTotals="showTotals">
            <Column field="account" :header="columnLabels.account" />
            <Column field="as_of" :header="columnLabels.as_of" formatters="date" />
            <Column field="cash_value" :header="columnLabels.cash" formatters="currency" :showTotal="showTotals" />
            <Column field="securities_value" :header="columnLabels.securities" formatters="currency" :showTotal="showTotals" />
            <Column field="current_value" :header="columnLabels.current_value" formatters="currency" :showTotal="showTotals" />
            <Column field="change_amount" :header="columnLabels.change_amount" :formatters="['currency', 'change-indicator']" :showTotal="showTotals" />
            <Column field="change_pct" :header="columnLabels.change_pct" :formatters="['percent', 'change-indicator']" />
        </DataTable>
    </Primitive>
</template>
<script>
const PortfolioSummaryGridProps = mergeProps(
    PrimitiveProps,
    {
        portfolio: {
            type: Array,
            default: () => [],
            desc: "An array of account objects"
        },
        columnLabels: {
            type: Object,
            default: () => { 
                return { 
                    "account": "Account",
                    "as_of": "As Of",
                    "cash": "Cash",
                    "securities": "Holdings",
                    "current_value": "Current Value",
                    "change_amount": "Change ($)",
                    "change_pct": "Change (%)"
                }
            },
            desc: "Text labels to apply to the table columns"
        },
        dataTableOptions: {
            type: Object,
            default: () => { return {} },
            desc: "An object containing DataTable component options"
        },
        showTotals: {
            type: Boolean,
            default: true,
            desc: "show columns totals"
        }
    }
);
</script>
<script setup>
// imports
import { mergeProps, computed, useSlots } from "vue";
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'
import MobileFilters from "@/components/DataTable/MobileFilters";
import DataTable from '@/components/DataTable/DataTable';
import Column from '@/components/DataTable/Column/Column';
import Base from "@/components/DataTable/Base";
import * as componentClasses from "@/modules/useCommonCSS";

// vars
// eslint-disable-next-line no-unused-vars
const props = defineProps(PortfolioSummaryGridProps);

const defaultDataTableOptions = computed(() => Base.defaultDataTableOptions(props.dataTableOptions));
 const slots = useSlots()

</script>
<style lang="scss" scoped>
.fb-portfolio-summary-grid::v-deep(td:not(td:nth-child(-n + 2))) {
    text-align: right;
}
</style>