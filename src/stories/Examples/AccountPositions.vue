<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="page">
        <h1 class="mb-5">Positions</h1>
        <PositionsGrid :positions="positions">
            <Column field="symbol" header="Symbol" type="quote" :quoteDetailOptions="quoteDetailOptions">
                <ColumnFilter filterType="text" operator="equality" />
            </Column>
            <Column field="security_description" header="Description" />
            <Column field="quantity" header="Quantity">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column field="market_value" header="Market Value" formatters="currency">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column field="change_in_value_amt" header="Change In Value ($)" :formatters="['currency','change-indicator']">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column field="change_in_value_pct" header="Change In Value (%)" :formatters="['percent','change-indicator']">
                <ColumnFilter filterType="text" operator="comparison" />
            </Column>
            <Column header="Actions" field="action" type="actions" :contextMenuOptions="contextMenuOptions" />
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
import { faker } from "@faker-js/faker";

const fetchQuote = async (symbol) => {
            console.log("fetching quote for %s", symbol)
            return new Promise(resolve => {
                const quote = {}
                setTimeout(function() { 
                    quote.showDetails = true;
                    quote.symbol = symbol;
                    quote.security_description = faker.company.name();
                    quote.current_price = 191.94 * Math.random();
                    quote.price_change_amt = 0.81;
                    quote.price_change_pct = 0.42;
                    quote.previous_close_price = 191.94;
                    quote.day_low_price =  192.25;
                    quote.day_high_price = 194.91;
                    quote.exchange = "NASDAQ";
                    quote.volume = "5.38M";
                    quote.bid = 192.75;
                    quote.ask = 191.75;
                    quote.pe_ratio = 32.75;
                    quote.dividend_yield = 0.50;
                    resolve(quote)
                }, 2000);
            });
        }
const quoteDetailOptions = {
    callback: fetchQuote,
}
const contextMenuOptions = {
    menuItems: [
            { url: null, label: "Market News" },
            { url: "some-url?id=<%=id%>&symbol=<%=symbol%>", label: "Company News" },
            { url: null, label: "Trade", callback: (item, rowData) => { console.log(item), console.log(rowData) } },
        ]
}
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