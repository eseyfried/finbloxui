import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue';
import Column from '@/components/DataTable/Column.vue';
import QuoteDetail from '@/components/Core/QuoteDetail/QuoteDetail.vue';

// eslint-disable-next-line storybook/story-exports
let defaultPositions = ref({});
export default {
    title: 'Library/Core/PositionsGrid',
    args: {
        positions: defaultPositions
    },
    render: (args) => ({
      components: { PositionsGrid, Column, QuoteDetail },
      setup() {
        const { positions } = storeToRefs(useDemoStore());
        args.positions = ref(positions.value);
        defaultPositions.value = args.positions;

        args.dataTableOptions = {
            "columnSelector": true
        }
        args.show = true;
        args.fetchQuote = async (symbol) => {
            console.log("fetching quote for %s", symbol)
            return new Promise(resolve => {
                const quote = {}
                setTimeout(function() { 
                    quote.showDetails = true;
                    quote.symbol = symbol;
                    quote.security_description = "Apple, Inc.";
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
        args.quoteDetailOptions = {
            callback: args.fetchQuote,
        }
        return { args };
      },
      template: `
        <PositionsGrid :positions="args.positions" style="margin-bottom: 50px;">
            <Column field="symbol" header="Symbol" type="quote" :quoteDetailOptions="args.quoteDetailOptions" />
            <Column field="security_description" header="Description" />
            <Column field="quantity" header="Quantity" />
            <Column field="market_value" header="Market Value" />
            <Column field="change_in_value_amt" header="Change In Value ($)" />
            <Column field="change_in_value_pct" header="Change In Value (%)" />
        </PositionsGrid>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `The PositionsGrid offers a special symbol quote hover feature using the [QuoteDetail](?path=/docs/example-core-quotedetail--docs) component. 

You can enable this by setting the following Column component properties:
- type: quote
- quoteDetailOptions: { callback: async (symbol) => {} } pass an asynchronous function the returns quote data

For more quote hover options, please see the [QuoteDetail](?path=/docs/example-core-quotedetail--docs) docs.
                `,
            },
            source: {
                code: `
const getQuote = async (symbol) => {
    // make async call to get quote
    const response = await fetch(symbol);
    return response;
}
const quoteDetailOptions = {
    callback: getQuote
}
<PositionsGrid :positions="positions">
    <Column field="symbol" header="Symbol" type="quote" :quoteDetailOptions="quoteDetailOptions" />
    <Column field="security_description" header="Description" />
    <Column field="quantity" header="Quantity" />
    <Column field="market_value" header="Market Value" />
    <Column field="change_in_value_amt" header="Change In Value ($)" />
    <Column field="change_in_value_pct" header="Change In Value (%)" />
</PositionsGrid>`
            }
        }
    }
};