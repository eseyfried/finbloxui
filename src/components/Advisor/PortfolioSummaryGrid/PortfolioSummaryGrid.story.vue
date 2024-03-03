<template>
    <Story
        title="Advisor/PortfolioSummary/PortfolioSummaryGrid"
        auto-props-disabled
    >
         <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstJson v-model="state.portfolio" title="portfolio" />
            <PropDesc :component="PortfolioSummaryGrid" prop="portfolio" />
            <HstJson v-model="state.columnLabels" title="columnLabels" />
            <PropDesc :component="PortfolioSummaryGrid" prop="columnLabels" />
            <HstJson v-model="state.dataTableOptions" title="dataTableOptions" />
            <PropDesc :component="PortfolioSummaryGrid" prop="dataTableOptions" />
            <HstCheckbox v-model="state.showTotals" title="showTotals" />
            <PropDesc :component="PortfolioSummaryGrid" prop="showTotals" />
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <PortfolioSummaryGrid
                        :as="state.as"
                        :portfolio="state.portfolio"
                        :columnLabels="state.columnLabels"
                        :showTotals="state.showTotals"
                        :dataTableOptions="state.dataTableOptions"
                    />
                </div>
            </template>
        </Variant>
        <Variant title="Hide Column Selector" :init-state="() => initState({ 'dataTableOptions': { 'columnSelector': false } })">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <PortfolioSummaryGrid
                        :as="state.as"
                        :portfolio="state.portfolio"
                        :columnLabels="state.columnLabels"
                        :showTotals="state.showTotals"
                        :dataTableOptions="state.dataTableOptions"
                    />
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import PropDesc from '@/../.histoire/components/PropDesc';
import PortfolioSummaryGrid from '@/components/Advisor/PortfolioSummaryGrid/PortfolioSummaryGrid';
import * as formatters from "@/modules/useFormatter";



const state = reactive({
    as: defaultValue(PortfolioSummaryGrid, 'as'),
    portfolio: [
        { account: "Smith Retirement", as_of: "2023-10-27", cash_value: "10000.00", securities_value:  "48000.00", current_value: "58000.00", change_amount: "1400.00", change_pct: "1.00" },
        { account: "Smith Trust", as_of: "2023-10-27", cash_value: "1000.00", securities_value:  "105000.00", current_value: "1060000.00", change_amount: "1400.00", change_pct: "1.50" }
    ],
    columnLabels: {
        "account": "Account",
        "as_of": "As Of",
        "cash": "Cash",
        "securities": "Holdings",
        "current_value": "Current Value",
        "change_amount": "Change ($)",
        "change_pct": "Change (%)"
    },
    showTotals: defaultValue(PortfolioSummaryGrid, 'showTotals'),
    dataTableOptions: defaultValue(PortfolioSummaryGrid, 'dataTableOptions'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>