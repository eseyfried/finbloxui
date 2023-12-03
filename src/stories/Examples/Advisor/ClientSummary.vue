<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Header brandName="OneLeaf Financial" />
    <div class="page client-summary">
        <div class="grid grid-cols-[200px_auto] gap-4">
            <div>
                <Menu />
            </div>
            <div>
                <h1 class="mb-5">Client Summary</h1>
                <div class="grid grid-cols-1 gap-4 mb-5">
                    <h2 class="mb-5">Client Details</h2>
                    <ClientCard :client="activeClient" v-if="activeClient" :showDetailsLink="false"/>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                        <InvestmentsChart  :data="investmentsData" :dates="InvestmentsDates"/>
                    </div>
                    <div>
                        <NetworthChart  :data="investmentsData" :dates="InvestmentsDates"/>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                        <h2>Target Allocation</h2>
                        <AssetAllocationChart
                            :labels="['Equity', 'Options', 'Funds', 'Fixed Income', 'Cash']"
                            :data="[40, 10, 35, 10, 5]"
                            :colors="chartColors"
                            :showTotal="false"
                            type="pie"
                        />
                    </div>
                    <div>
                        <h2>Actual Allocation</h2>
                        <AssetAllocationChart
                            :labels="['Equity', 'Options', 'Funds', 'Fixed Income', 'Cash']"
                            :data="[40, 10, 35, 10, 5]"
                            :colors="chartColors"
                            :showTotal="false"
                            type="pie"
                        />
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-4 mb-5">
                    <h2 class="mb-5">Portfolio Summary</h2>
                    <PortfolioSummaryGrid :portfolio="portfolio"/>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import moment from "moment";
import Header from '@/stories/Examples/Header.vue';
import Menu from '@/stories/Examples/Menu.vue';
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';
import ClientCard from "@/components/Advisor/Clients/ClientCard";
import PortfolioSummaryGrid from '@/components/Advisor/PortfolioSummaryGrid/PortfolioSummaryGrid.vue';
import InvestmentsChart from '@/components/Core/Charts/InvestmentsChart/InvestmentsChart.vue';
import NetworthChart from '@/components/Core/Charts/NetworthChart/NetworthChart.vue';
import AssetAllocationChart from "@/components/Core/Charts/AssetAllocationChart/AssetAllocationChart";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    theme: {
        type: String,
        default: null,
    }
});


const { clients, historicalBalances } = storeToRefs(useDemoStore());
const activeClient = computed( () => clients.value[0]);
const investmentsData = historicalBalances.value;
const InvestmentsDates = Array.from({length: historicalBalances.value.length}, (_, i) => moment().dayOfYear(i + 1).format("YYYY-MM-DD"));
const portfolio = [
            { account: "Smith Retirement", as_of: "2023-10-27", cash_value: "10000.00", securities_value:  "48000.00", current_value: "58000.00", change_amount: "1400.00", change_pct: "1.00" },
            { account: "Smith Trust", as_of: "2023-10-27", cash_value: "1000.00", securities_value:  "105000.00", current_value: "1060000.00", change_amount: "1400.00", change_pct: "1.50" }
        ];
const chartColors = computed(() => {
    return [...geChartColorsByTheme(props.theme)];
})
//methods

</script>

<style lang="scss" scoped>
.page {
    margin: 2rem;
}

.data-point-card {
    background-color: var(--example-data-point-background);
    @apply rounded text-white drop-shadow-md;
}


</style>