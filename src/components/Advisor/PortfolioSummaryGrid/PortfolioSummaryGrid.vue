<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-portfolio-summary-grid" :class="componentClasses.getClassByType('component')">
        <MobileFilters />
        <DataTable v-if="portfolio.length > 0" :rows="portfolio" v-bind="defaultDataTableOptions" teleportTo=".fb-portfolio-summary-grid" :showTotals="showTotals">
            <Column field="account" :header="columnLabels.account" />
            <Column field="as_of" :header="columnLabels.as_of" formatters="date" />
            <Column field="cash_value" :header="columnLabels.cash" formatters="currency" :showTotal="showTotals" />
            <Column field="securities_value" :header="columnLabels.securities" formatters="currency" :showTotal="showTotals" />
            <Column field="current_value" :header="columnLabels.current_value" formatters="currency" :showTotal="showTotals" />
            <Column field="change_amount" :header="columnLabels.change_amount" :formatters="['currency', 'change-indicator']" :showTotal="showTotals" />
            <Column field="change_pct" :header="columnLabels.change_pct" :formatters="['percent', 'change-indicator']" />
        </DataTable>
    </div>
</template>
<script setup>
// imports
import MobileFilters from "@/components/DataTable/MobileFilters";
import DataTable from "@/components/DataTable/DataTable";
import Base from "@/components/DataTable/Base";
import Column from '@/components/DataTable/Column.vue';
import * as componentClasses from "@/modules/useCommonCSS";

// vars
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    portfolio: {
        type: Array,
        default: () => []
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
        }
    },
    dataTableOptions: {
        type: Object,
        default: () => {}
    },
    showTotals: {
        type: Boolean,
        default: true
    }
});

const defaultDataTableOptions = Base.defaultDataTableOptions(props.dataTableOptions);


</script>
<style lang="scss" scoped>
.fb-portfolio-summary-grid::v-deep(td:not(td:nth-child(-n + 2))) {
    text-align: right;
}
</style>