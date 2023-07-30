import { ref } from "vue";
import QuoteDetail from '@/components/Core/QuoteDetail/QuoteDetail.vue';


// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Example/Core/QuoteDetail',
    args: {
        show: true,
        showDetails: true,
        symbol: "AAPL",
        security_description: "Apple, Inc.",
        current_price: 192.75,
        price_change_amt: -0.81,
        price_change_pct: 0.42,
        previous_close_price: 191.94,
        day_low_price: 192.25,
        day_high_price: 194.91,
        exchange: "NASDAQ",
        volume: "5.38M",
        bid: 192.75,
        ask: 191.75,
        pe_ratio: 32.75,
        dividend_yield: 0.50,
    },
    render: (args) => ({
      components: { QuoteDetail },
      setup() {
        return { args };
      },
      template: `
      <QuoteDetail />`,
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the QuoteDetail component.",
            },
            source: {
                code: `
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
    :showDetails="showDetails"
/>`
            }
        }
    }
};