<template>
    <Story
        title="Accounts/Positions/PositionsGrid"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.positions" title="positions" />
            <PropDesc :component="PositionsGrid" prop="positions" />
            <HstJson v-model="state.dataTableOptions" title="dataTableOptions" />
            <PropDesc :component="PositionsGrid" prop="dataTableOptions" />
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <PositionsGrid :positions="state.positions" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" />
                        <Column field="market_value" header="Market Value" />
                        <Column field="change_in_value_amt" header="Change In Value ($)" />
                        <Column field="change_in_value_pct" header="Change In Value (%)" />
                    </PositionsGrid>
                </div>
            </template>
        </Variant>
        <Variant title="Re-order Columns" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <PositionsGrid :positions="state.positions" :dataTableOptions="state.dataTableOptions">
                        <Column field="security_description" header="Description" />
                        <Column field="symbol" header="Symbol" />
                        <Column field="quantity" header="Quantity" />
                        <Column field="market_value" header="Market Value" />
                        <Column field="change_in_value_amt" header="Change In Value ($)" />
                        <Column field="change_in_value_pct" header="Change In Value (%)" />
                    </PositionsGrid>
                </div>
            </template>
        </Variant>
        <Variant title="Formatted Columns" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <PositionsGrid :positions="state.positions" :dataTableOptions="state.dataTableOptions">
                        <Column field="security_description" header="Description" :formatters="(value) => value.toUpperCase()"/>
                        <Column field="symbol" header="Symbol" />
                        <Column field="quantity" header="Quantity" />
                        <Column field="market_value" header="Market Value" formatters="currency" />
                        <Column field="change_in_value_amt" header="Change In Value ($)" :formatters="['currency','change-indicator']" />
                        <Column field="change_in_value_pct" header="Change In Value (%)" :formatters="['percent','change-indicator']" />
                    </PositionsGrid>
                </div>
            </template>
        </Variant>
        <Variant title="Without Column Selector" :init-state="() => initState({ 'dataTableOptions': { columnSelector: false  }})">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <PositionsGrid :positions="state.positions" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" />
                        <Column field="market_value" header="Market Value" />
                        <Column field="change_in_value_amt" header="Change In Value ($)" />
                        <Column field="change_in_value_pct" header="Change In Value (%)" />
                    </PositionsGrid>
                </div>
            </template>
        </Variant>
        <Variant title="With Column Totals" :init-state="() => initState({ 'dataTableOptions': { showTotals: true  }})">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <PositionsGrid :positions="state.positions" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" />
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" />
                        <Column field="market_value" header="Market Value" :showTotal="true" />
                        <Column field="change_in_value_amt" header="Change In Value ($)" :showTotal="true"/>
                        <Column field="change_in_value_pct" header="Change In Value (%)" />
                    </PositionsGrid>
                </div>
            </template>
        </Variant>
        <Variant title="Filterable Columns" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <PositionsGrid :positions="state.positions" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol">
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
                    </PositionsGrid>
                </div>
            </template>
        </Variant>
        <Variant title="Action Column" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <PositionsGrid :positions="state.positions" :dataTableOptions="state.dataTableOptions">
                        <Column field="security_description" header="Description" />
                        <Column field="symbol" header="Symbol" />
                        <Column field="quantity" header="Quantity" />
                        <Column field="market_value" header="Market Value" />
                        <Column field="change_in_value_amt" header="Change In Value ($)" />
                        <Column field="change_in_value_pct" header="Change In Value (%)" />
                        <Column header="Actions" field="action" type="actions" :contextMenuOptions="actionMenuOptions" />
                    </PositionsGrid>
                </div>
            </template>
        </Variant>
        <Variant title="With QuoteHover" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-3/4">
                    <PositionsGrid :positions="state.positions" :dataTableOptions="state.dataTableOptions">
                        <Column field="symbol" header="Symbol" type="quote" :quoteDetailOptions="quoteDetailOptions"/>
                        <Column field="security_description" header="Description" />
                        <Column field="quantity" header="Quantity" />
                        <Column field="market_value" header="Market Value" />
                        <Column field="change_in_value_amt" header="Change In Value ($)" />
                        <Column field="change_in_value_pct" header="Change In Value (%)" />
                        <Column header="Actions" field="action" type="actions" :contextMenuOptions="actionMenuOptions" />
                    </PositionsGrid>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { faker } from "@faker-js/faker";
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { usePositionsData } from "@/../.histoire/modules/useClientData";
import PropDesc from '@/../.histoire/components/PropDesc';
import * as formatters from "@/modules/useFormatter";
import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue';
import Column from '@/components/DataTable/Column/Column';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter';



const actionMenuOptions = {
    menuItems: [
            { url: null, label: "Market News" },
            { url: "some-url?id=<%=id%>&symbol=<%=symbol%>", label: "Company News" },
            { url: null, label: "Trade", callback: (item, rowData) => { console.log(item), console.log(rowData) } },
        ]
}

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

const quoteDetailOptions = {
    callback: fetchQuote,
}

const state = reactive({
    positions: usePositionsData(),
    dataTableOptions: defaultValue(PositionsGrid, 'dataTableOptions'),

})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>