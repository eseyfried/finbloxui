import { ref } from "vue";
import QuoteDetail from '@/components/Core/QuoteDetail/QuoteDetail.vue';


// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Example/Core/QuoteDetail',
    args: {
        showDetails: true,
        symbol: "AAPL",
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
      template: '<QuoteDetail :callback="getQuote" callbackOn="mount" />',
      methods: { 
            getQuote: async (symbol) => {
                console.log("fetching quote for %s...", symbol);
                const quote = {}
                return new Promise(resolve => {
                    setTimeout(function() { 
                        quote.showDetails = true;
                        quote.symbol = symbol;
                        quote.security_description = "Apple, Inc.";
                        quote.current_price = 192.75;
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
                    }, 5000);
                });
            }
        }
    }),
    parameters: {
        docs: {
            description: {
                story: `The QuoteDetail component can call a custom async callback when either mounted or when shown. The callback receives the passed symbol
prop as an argument. The expected return object should include all of the quote props as documented above.
`,
            },
            source: {
                code: `
const getQuote = async () => {
    // fetch quote via async api call
    const response = await fetch(...);
    // the return object should be an object with properties matching those of the QuoteDetail component
    return response
}
<QuoteDetail symbol="AAPL" callback="getQuote" callbackOn="mount"/>
<QuoteDetail symbol="AAPL" callback="getQuote" callbackOn="show"/>
/>`
            }
        }
    }
};