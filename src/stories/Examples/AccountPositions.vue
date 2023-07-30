<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="page">
        <ToggleTheme :class="['primary-button']" />
        <h1 class="mb-5">Positions</h1>
        <PositionsGrid :positions="positions">
            <Column field="symbol" header="Symbol" />
            <Column field="security_description" header="Description" />
            <Column field="quantity" header="Quantity" />
            <Column field="market_value" header="Market Value" />
            <Column field="change_in_value_amt" header="Change In Value ($)" />
            <Column field="change_in_value_pct" header="Change In Value (%)" />
        </PositionsGrid>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ToggleTheme from "./ToggleTheme";
import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';
const { positions } = storeToRefs(useDemoStore());
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