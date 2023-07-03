<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="page">
        <ToggleTheme :class="['primary-button']" />
        <h1 class="mb-5">Dashboard</h1>
        <div class="grid grid-cols-3 gap-4 mb-5">
            <div :class="dataPointClasses" class="icon aum fb-data-point-icon">
                <DataPoint :dataPoint="{ label: 'YTD AUM', value: aum, format: 'currency', trend: { direction: 'up', value: '14504.32', format: 'currency'}}" />
            </div>
            <div :class="dataPointClasses" class="fees">
                <DataPoint :dataPoint="{ label: 'YTD Fees', value: aum * .125, format: 'currency', trend: { direction: 'down', value: '1504.32', format: 'currency'}}" />
            </div>
            <div :class="dataPointClasses" class="clients">
                <DataPoint :dataPoint="{ label: 'Total Clients', value: clients.length, format: null, trend: {} }" />
            </div>
        </div>
        <h2>Clients</h2>
        <ClientList :clients="clients" />
    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ToggleTheme from "./ToggleTheme";
import ClientList from "@/components/Advisor/Clients/ClientList";
import DataPoint from "@/components/Core/DataPoint";


const { accounts, clients } = storeToRefs(useDemoStore());
const aum = accounts.value.map((account) => account.total_market_value).reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue);
}, 0);

const dataPointClasses = [
    'bg-indigo-500',
    'rounded',
    'text-white',
    'drop-shadow-md',
];
</script>
<style lang="scss" scoped>
.page {
    margin: 2rem;
}
.page > h1 {
    margin-top: 4rem;
    border-bottom: 1px solid #eeeeee;
}
</style>