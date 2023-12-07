<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Header brandName="OneLeaf Financial" />
    <div class="page client-summary">
        <div class="grid grid-cols-[200px_auto] gap-4">
            <div>
                <Menu />
            </div>
            <div>
                <h1 class="mb-5">Analytics &amp; Insights</h1>
                <div class="grid grid-cols-1 gap-4 mb-5">
                    <h2 class="mb-5">Top Clients By AUM</h2>
                    <TopClientsByAum :clients="clientHouseholdNames" :data="clientAUM" />
                </div>
                <div class="grid grid-cols-1 gap-4 mb-5">
                    <h2 class="mb-5">Top Clients By Fees</h2>
                    <TopClientsByFees :clients="clientFeeHouseholdNames" :data="clientFees" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                        <h2>Total Clients By Age</h2>
                        <ClientsByAge :data="clientsByAge" :labels="clientsByAgeLabels" :colors="chartColors"  />
                    </div>
                    <div>
                        <h2>Total Clients By Age</h2>
                        <AccountsHeldawayByAccountType :labels="AccountsHeldawayByAccountTypeLabels" :data="AccountsHeldawayByAccountTypeData" :colors="chartColors" totalValue="$10M" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import moment from "moment";
import { faker } from "@faker-js/faker";
import Header from '@/stories/Examples/Header.vue';
import Menu from '@/stories/Examples/Menu.vue';
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import { geChartColorsByTheme } from '@/stories/Examples/modules/chartThemeColors';
import TopClientsByAum from '@/components/Advisor/Clients/TopClientsByAum/TopClientsByAum.vue';
import TopClientsByFees from '@/components/Advisor/Clients/TopClientsByFees/TopClientsByFees.vue';
import ClientsByAge from '@/components/Core/Charts/ClientsByAge/ClientsByAge.vue';
import AccountsHeldawayByAccountType from '@/components/Core/Charts/AccountsHeldawayByAccountType/AccountsHeldawayByAccountType.vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    theme: {
        type: String,
        default: null,
    }
});

const { clients } = storeToRefs(useDemoStore()); 
const clientHouseholdNames = clients.value.map(client => client.name.household);
const clientFeeHouseholdNames = clientHouseholdNames.map(clientname => clientname).reverse();
const clientAUM = clients.value.map(client => parseFloat(client.stats[0].value)).sort((a, b) => a-b).reverse();
const clientFees = clients.value.map(client => faker.finance.amount(15000, 50000, 2, '', false)).sort((a, b) => a-b).reverse();
const clientsByAge = [10, 15, 20, 23, 7, 3, 4, 0];
const clientsByAgeLabels = ['20-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100+'];
const AccountsHeldawayByAccountTypeLabels = ['Retirement', 'Annuity', 'Taxable', 'Trust'];
const AccountsHeldawayByAccountTypeData = [10, 15, 20, 23];
const chartColors = [...geChartColorsByTheme(props.theme)];
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