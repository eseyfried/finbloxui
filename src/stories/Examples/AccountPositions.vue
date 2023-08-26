<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Header brandName="OneLeaf Financial" />
    <div class="page">
        <h1 class="mb-5">Positions</h1>
        <AccountCarousel :accounts="accounts" @fb-account-carousel:click="handleAccountClick($event)" />
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
    <SFCSource filename="AccountPositions.vue" tag="all" />
    <SFCSource :filename="`${theme}.css`" tag="all" label="Show CSS Source" v-if="theme != 'headless'" />
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    theme: {
        type: String,
        default: null
    }
});

/**
 * Use a reactive data store to manage your application data.
 * You can centralize your api calls within the data layer.
 */
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import SFCSource from '@/stories/Examples/SFCSource.vue';
/**
 * Import your components
 */
import Header from '@/stories/Examples/Header.vue';
import AccountCarousel from '@/components/Core/Navigation/AccountCarousel.vue';
import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue';
/**
 * Import modules, libraries, etc.
 */
// Here we use faker-js to generate some fake data for demonstration purposes
import { faker } from "@faker-js/faker";
/**
 * Let's grab some data from our data store to pass into our components
 */
const { positions, accounts } = storeToRefs(useDemoStore());

/**
 * The PositionsGrid component offers a QuoteHover option.
 * To use that option we must supply a callback that provides a
 * quote data object given a symbol. Here is a mock callback that
 * simulates making an async call to an api and returns a quote object.
 */
const fetchQuote = async (symbol) => {
    console.log("fetching quote for %s", symbol)
    return new Promise(resolve => {
        const quote = {}
        // simulate making an async call
        setTimeout(function() { 
            // construct quote object with sample data
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
            // return quote object
            resolve(quote);
        }, 2000);
    });
}
/**
 * The PositionsGrid accepts a quoteDetailsOptions property with
 * configuration options for the QuoteHover component. Here we
 * configure it with out callback.
 */
const quoteDetailOptions = {
    callback: fetchQuote,
}
/**
 * The PositionsGrid component offers an option to use a Column component
 * configured as an action menu column. This requires passing a contextMenuOptions
 * object. Here we configure the menu items for the action menu.
 */
const contextMenuOptions = {
    menuItems: [
            { url: null, label: "Market News" },
            { url: "some-url?id=<%=id%>&symbol=<%=symbol%>", label: "Company News" },
            { url: null, label: "Trade", callback: (item, rowData) => { console.log(item), console.log(rowData) } },
        ]
}
/**
 * The AccountCarousel component fires an event when an account is clicked.
 * Here we are binding an event handler to that event where we can decide what
 * action to take. In this trivial example, we simply alert the account number.
 */
const handleAccountClick = (event) => {
    const { account } = event;
    window.alert(`Account: ${account.number} was selected`)
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