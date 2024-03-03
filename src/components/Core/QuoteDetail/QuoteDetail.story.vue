<template>
    <Story
        title="Core/QuoteDetail"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstCheckbox v-model="state.show" title="show" />
            <PropDesc :component="QuoteDetail" prop="show" />
            <HstCheckbox v-model="state.showDetails" title="showDetails" />
            <PropDesc :component="QuoteDetail" prop="showDetails" />
            <HstText v-model="state.symbol" title="symbol" />
            <PropDesc :component="QuoteDetail" prop="symbol" />
            <HstText v-model="state.security_description" title="security_description" />
            <PropDesc :component="QuoteDetail" prop="security_description" />
            <HstText v-model="state.current_price" title="current_price" />
            <PropDesc :component="QuoteDetail" prop="current_price" />
            <HstText v-model="state.price_change_amt" title="price_change_amt" />
            <PropDesc :component="QuoteDetail" prop="price_change_amt" />
            <HstText v-model="state.price_change_pct" title="price_change_pct" />
            <PropDesc :component="QuoteDetail" prop="price_change_pct" />
            <HstText v-model="state.previous_close_price" title="previous_close_price" />
            <PropDesc :component="QuoteDetail" prop="previous_close_price" />
            <HstText v-model="state.day_low_price" title="day_low_price" />
            <HstText v-model="state.day_high_price" title="day_high_price" />
            <PropDesc :component="QuoteDetail" prop="day_high_price" />
            <HstText v-model="state.exchange" title="exchange" />
            <PropDesc :component="QuoteDetail" prop="exchange" />
            <HstText v-model="state.volume" title="volume" />
            <PropDesc :component="QuoteDetail" prop="volume" />
            <HstText v-model="state.bid" title="bid" />
            <PropDesc :component="QuoteDetail" prop="bid" />
            <HstText v-model="state.ask" title="ask" />
            <PropDesc :component="QuoteDetail" prop="ask" />
            <HstText v-model="state.pe_ratio" title="pe_ratio" />
            <PropDesc :component="QuoteDetail" prop="pe_ratio" />
            <HstText v-model="state.dividend_yield" title="dividend_yield" />
            <PropDesc :component="QuoteDetail" prop="dividend_yield" />
            <HstJson v-model="state.labels" title="labels" />
            <PropDesc :component="QuoteDetail" prop="labels" />
        </template>

        <Variant title="Pass Quote as Props" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <QuoteDetail
                        :show="state.show"
                        :showDetails="state.showDetails"
                        :symbol="state.symbol"
                        :security_description="state.security_description"
                        :current_price="state.current_price"
                        :price_change_amt="state.price_change_amt"
                        :price_change_pct="state.price_change_pct"
                        :previous_close_price="state.previous_close_price"
                        :day_low_price="state.day_low_price"
                        :day_high_price="state.day_high_price"
                        :exchange="state.exchange"
                        :volume="state.volume"
                        :bid="state.bid"
                        :ask="state.ask"
                        :pe_ratio="state.pe_ratio"
                        :dividend_yield="state.dividend_yield"
                        :labels="state.labels"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Fetch Quote With Callback" :init-state="() => initState({'show': false })">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <input type="text" v-model="state.symbol" @input="() => { state.symbol = state.symbol.toUpperCase();state.show = false;}" placeholder="enter symbol" />
                    <button @click="state.show = true">Fetch Quote</button>
                    <QuoteDetail
                        :show="state.show"
                        :showDetails="state.showDetails"
                        :symbol="state.symbol"
                        :callback="fetchQuote"
                        callbackOn="show"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Quote Hover With Callback" :init-state="() => initState({'show': false })">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <a
                        href="#"
                        data-symbol="MSFT"
                        id="symbol"
                        @click.prevent="() => null"
                        @mouseover="state.show = true"
                        @mouseleave="state.show = false;updatePopover=false;"
                    >
                        MSFT
                    </a>
                    <Popover
                        selector="a[data-symbol='MSFT']"
                        trigger="hover"
                        :updatePopover="updatePopover"
                    >
                        <QuoteDetail
                            :show="state.show"
                            :symbol="state.symbol"
                            :callback="fetchQuote"
                            callbackOn="show"
                            :class="{ 'fb-quote-detail-hover': state.show }"
                            @fb-quote-detail-loaded="updatePopover = true"
                        >
                            <template #loader="{}">
                            loading quote...
                            </template>
                        </QuoteDetail>
                    </Popover>
                    
                </div>
            </template>
        </Variant>

        <Variant title="Custom Templates" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <QuoteDetail
                        :show="state.show"
                        :showDetails="state.showDetails"
                        :symbol="state.symbol"
                        :security_description="state.security_description"
                        :current_price="state.current_price"
                        :price_change_amt="state.price_change_amt"
                        :price_change_pct="state.price_change_pct"
                        :previous_close_price="state.previous_close_price"
                        :day_low_price="state.day_low_price"
                        :day_high_price="state.day_high_price"
                        :exchange="state.exchange"
                        :volume="state.volume"
                        :bid="state.bid"
                        :ask="state.ask"
                        :pe_ratio="state.pe_ratio"
                        :dividend_yield="state.dividend_yield"
                        :labels="state.labels"
                    >
                        <template #heading="{props, symbol, security_description, attrs}">
                            <div v-bind="attrs">
                                <h3>{{ symbol }}</h3>
                                <h4>{{ security_description }}</h4>
                            </div>
                        </template>
                        <template #price="{props, current_price, price_change_amt, price_change_pct, price_change_pct_css, price_change_amt_css, attrs}">
                            <div v-bind="attrs">
                                <h4>{{ current_price }}</h4>
                                <span
                                    :class="price_change_amt_css"
                                >
                                    {{ price_change_amt }}
                                </span>
                                <span
                                    :class="price_change_pct_css"
                                >
                                    ({{ price_change_pct }})
                                </span>
                            </div>
                        </template>

                        <template #details="{props, previous_close_price, day_low_price, day_high_price, dividend_yield, bid, ask, volume, exchange, pe_ratio, attrs}">
                            <div v-bind="attrs">
                                <table>
                                    <tr>
                                        <th>{{ props.labels.previous_close_price}}</th>
                                        <td>{{ previous_close_price }} </td>
                                    </tr>
                                    <tr>
                                        <th>{{ props.labels.day_range}}</th>
                                        <td>{{ day_low_price }} - {{ day_high_price }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ props.labels.dividend_yield}}</th>
                                        <td>{{ dividend_yield }} </td>
                                    </tr>
                                    <tr>
                                        <th>{{ props.labels.bid}}</th>
                                        <td>{{ bid }} </td>
                                    </tr>
                                    <tr>
                                        <th>{{ props.labels.ask}}</th>
                                        <td>{{ ask }} </td>
                                    </tr>
                                    <tr>
                                        <th>{{ props.labels.pe_ratio}}</th>
                                        <td>{{ pe_ratio }} </td>
                                    </tr>
                                    <tr>
                                        <th>{{ props.labels.volume}}</th>
                                        <td>{{ volume }} </td>
                                    </tr>
                                    <tr>
                                        <th>{{ props.labels.exchange}}</th>
                                        <td>{{ exchange }} </td>
                                    </tr>
                                </table>
                            </div>
                        </template>
                    </QuoteDetail>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import PropDesc from '@/../.histoire/components/PropDesc';
import { logEvent } from 'histoire/client'

import QuoteDetail from '@/components/Core/QuoteDetail/QuoteDetail';

import Popover from '@/components/Core/Popover/Popover';


const fetchQuote = async (symbol) => {
    console.log("fetching quote for %s", symbol)
    return new Promise(resolve => {
        const quote = {}
        setTimeout(function() { 
            quote.showDetails = true;
            quote.symbol = symbol;
            quote.security_description = `${symbol}, Inc.`;
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


const updatePopover = ref(false);


const state = reactive({
    show: defaultValue(QuoteDetail, 'show', true),
    showDetails: defaultValue(QuoteDetail, 'showDetails', true),
    symbol: defaultValue(QuoteDetail, 'symbol', "AAPL"),
    security_description: defaultValue(QuoteDetail, 'security_description', "Apple, Inc."),
    current_price: defaultValue(QuoteDetail, 'current_price', 192.75),
    price_change_amt: defaultValue(QuoteDetail, 'price_change_amt', -0.81),
    price_change_pct: defaultValue(QuoteDetail, 'price_change_pct', 0.42),
    previous_close_price: defaultValue(QuoteDetail, 'previous_close_price', 191.94),
    day_low_price: defaultValue(QuoteDetail, 'day_low_price', 192.25),
    day_high_price: defaultValue(QuoteDetail, 'day_high_price', 194.91),
    exchange: defaultValue(QuoteDetail, 'exchange', "NASDAQ"),
    volume: defaultValue(QuoteDetail, 'volume', "5.38M"),
    bid: defaultValue(QuoteDetail, 'bid', 192.75),
    ask: defaultValue(QuoteDetail, 'ask', 191.75),
    pe_ratio: defaultValue(QuoteDetail, 'pe_ratio', 32.75),
    dividend_yield: defaultValue(QuoteDetail, 'dividend_yield', 0.50),
    labels: defaultValue(QuoteDetail, 'labels')
})

const initState = (props) => {
    return {
        ...state,
        ...props
    }
}


</script>