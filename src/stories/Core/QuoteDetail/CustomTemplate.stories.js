import { ref } from "vue";
import QuoteDetail from '@/components/Core/QuoteDetail/QuoteDetail.vue';


// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Library/Core/QuoteDetail',
    args: {
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
      <QuoteDetail>
        <template #heading="slotProps">
            <div v-bind="slotProps.attrs">
                <h3>{{ slotProps.symbol }} - {{ slotProps.security_description }}</h3>
            </div>
        </template>
        <template #price="slotProps">
            <div v-bind="slotProps.attrs">
                <h4>{{ slotProps.current_price }}</h4>
                <div class="my-custom-class">
                    <span
                        :class="slotProps.price_change_pct_css"
                    >
                        {{ slotProps.price_change_pct }}
                    </span>
                    <span
                        :class="slotProps.price_change_amt_css"
                    >
                        {{ slotProps.price_change_amt }}
                    </span>
                </div>
            </div>
        </template>
        <template #details="slotProps">
            <div v-bind="slotProps.attrs">
                <ul>
                    <li>{{ slotProps.props.labels.previous_close_price }}: <span>{{ slotProps.previous_close_price }}</span></li>
                    <li>{{ slotProps.props.labels.day_range }}: <span>{{ slotProps.day_low_price }} - {{ slotProps.day_high_price }}</span></li>
                    <li>{{ slotProps.props.labels.volume }}: <span>{{ slotProps.props.volume }}</span></li>
                    <li>{{ slotProps.props.labels.pe_ratio }}: <span>{{ slotProps.props.pe_ratio }}</span></li>
                    <li>{{ slotProps.props.labels.dividend_yield }}: <span>{{ slotProps.dividend_yield }}</span></li>
                    <li>{{ slotProps.props.labels.bid }}: <span>{{ slotProps.bid }}</span></li>
                    <li>{{ slotProps.props.labels.ask }}: <span>{{ slotProps.ask }}</span></li>
                    <li>{{ slotProps.props.labels.exchange }}: <span>{{ slotProps.props.exchange }}</span></li>
                </ul>
            </div>
        </template>
      </QuoteDetail>
      `,
    }),
    parameters: {
        docs: {
            description: {
                story: `<a name="custom"></a>You can override the default templates with your own custom layout using slotted content. 
Wrap your content in a slot template tag using one of the above documented slot names along with their respective available slotProps.
All slot templates receive the passed in props in their raw unformatted form in slotProps.props. Where props have been formatted or mutated,
they are specifically passed back in their formatted state as documented above. For example, current_price is available unformatted as slotProps.props.current_price
and formatted as slotProps.current_price.
`,
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
>
    <template #heading="slotProps">
        <div v-bind="slotProps.attrs">
            <h3>{{ slotProps.symbol }} - {{ slotProps.security_description }}</h3>
        </div>
    </template>
    <template #price="slotProps">
        <div v-bind="slotProps.attrs">
            <h4>{{ slotProps.current_price }}</h4>
            <div class="my-custom-class">
                <span
                    :class="slotProps.price_change_pct_css"
                >
                    {{ slotProps.price_change_pct }}
                </span>
                <span
                    :class="slotProps.price_change_amt_css"
                >
                    {{ slotProps.price_change_amt }}
                </span>
            </div>
        </div>
    </template>
    <template #details="slotProps">
        <div v-bind="slotProps.attrs">
            <ul>
                <li>{{ slotProps.props.labels.previous_close_price }}: <span>{{ slotProps.previous_close_price }}</span></li>
                <li>{{ slotProps.props.labels.day_range }}: <span>{{ slotProps.day_low_price }} - {{ slotProps.day_high_price }}</span></li>
                <li>{{ slotProps.props.labels.volume }}: <span>{{ slotProps.props.volume }}</span></li>
                <li>{{ slotProps.props.labels.pe_ratio }}: <span>{{ slotProps.props.pe_ratio }}</span></li>
                <li>{{ slotProps.props.labels.dividend_yield }}: <span>{{ slotProps.dividend_yield }}</span></li>
                <li>{{ slotProps.props.labels.bid }}: <span>{{ slotProps.bid }}</span></li>
                <li>{{ slotProps.props.labels.ask }}: <span>{{ slotProps.ask }}</span></li>
                <li>{{ slotProps.props.labels.exchange }}: <span>{{ slotProps.props.exchange }}</span></li>
            </ul>
        </div>
    </template>
</QuoteDetail>`
            }
        }
    }
};