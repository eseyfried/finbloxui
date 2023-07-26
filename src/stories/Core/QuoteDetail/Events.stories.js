import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import QuoteDetail from '@/components/Core/QuoteDetail/QuoteDetail.vue';


// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Example/Core/QuoteDetail',
    args: {
        showDetails: true,
        symbol: null,
        security_description: null,
        current_price: null,
        price_change_amt: null,
        price_change_pct: null,
        previous_close_price: null,
        day_low_price: null,
        day_high_price: null,
        exchange: null,
        volume: null,
        bid: null,
        ask: null,
        pe_ratio: null,
        dividend_yield: null,
    },
    render: (args) => ({
      components: { QuoteDetail },
      setup() {
        return { args };
      },
      template: '<QuoteDetail @fb-quote-detail-before-mount="handleEvent($event)" />',
      methods: { 
            handleEvent: () => { 
                setTimeout(() => {
                    args.showDetails = true;
                    args.symbol = "AAPL";
                    args.security_description = "Apple, Inc.";
                    args.current_price = 192.75;
                    args.price_change_amt = 0.81;
                    args.price_change_pct = 0.42;
                    args.previous_close_price = 191.94;
                    args.day_low_price =  192.25;
                    args.day_high_price = 194.91;
                    args.exchange = "NASDAQ";
                    args.volume = "5.38M";
                    args.bid = 192.75;
                    args.ask = 191.75;
                    args.pe_ratio = 32.75;
                    args.dividend_yield = 0.50;
                    action("fb-quote-detail-before-mount")(args)
                }, 5000);
            } 
        }
    }),
    parameters: {
        docs: {
            description: {
                story: `The QuoteDetail component offers 1 event that you may bind event listeners to:

- fb-quote-detail-before-mount - triggers before the QuoteDetail component is rendered to the DOM. This is ideal for calling a callback to 
asynchronously fetch quote information and set the QuoteDetail props. The example below shows a mock callback fetching data and setting the props.
`,
            },
            source: {
                code: `
const getQuote = async () => {
    // fetch quote via async api call
    const response = await fetch(...);
    // set QuoteDetail component props with results of quote api call
    const symbol = ...
    const security_description = ...
    ...
    const dividend_yield = ...
}
<QuoteDetail
    :symbol="symbol"
    :security_description="security_description"
    :current_price="current_price"
    :price_change_amt="price_change_amt"
    :previous_close_price="previous_close_price"
    :day_low_price="day_low_price"
    :day_high_price="day_high_price"
    :exchange="exchange"
    :volume="volume"
    :bid="bid"
    :ask="ask"
    :pe_ratio="pe_ratio"
    :dividend_yield="dividend_yield"
    @fb-quote-detail-before-mount="getQuote()"
/>`
            }
        }
    }
};