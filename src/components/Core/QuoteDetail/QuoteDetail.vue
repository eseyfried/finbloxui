<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-quote-detail" :class="componentClasses.getClassByType('component')" v-if="show">
        <slot name="loader" v-if="!isLoaded">
            <div class="fb-loading">
                Loading...
            </div>
        </slot>
        <slot
            name="heading"
            :props="props"
            v-if="isLoaded"
            :attrs="{
                class: ['fb-quote-detail-heading']
            }"
            :symbol="quote.symbol.toUpperCase()"
            :security_description="quote.security_description"
        >
            <div class="fb-quote-detail-heading">
                <h3>{{ quote.security_description }} ({{ quote.symbol.toUpperCase() }})</h3>
            </div>
        </slot>
        <slot name="price"
            :props="props"
            v-if="isLoaded"
            :attrs="{
                class: ['fb-quote-detail-price']
            }"
            :current_price="formatters.formatCurrency(quote.current_price)"
            :price_change_pct="formatters.formatPercent(quote.price_change_pct)"
            :price_change_amt="formatters.formatCurrency(quote.price_change_amt)"
            :price_change_pct_css="priceChangePctClass"
            :price_change_amt_css="priceChangeAmtClass"
        >
            <div class="fb-quote-detail-price">
                <h4>{{ formatters.formatCurrency(quote.current_price) }}</h4>
                <span
                    :class="priceChangePctClass"
                >
                    {{ formatters.formatPercent(quote.price_change_pct) }}
                </span>
                <span
                    :class="priceChangeAmtClass"
                >
                    {{ formatters.formatCurrency(quote.price_change_amt) }}
                </span>
            </div>
        </slot>
        <slot
            name="details"
            :props="props"
            :attrs="{
                class: ['fb-quote-detail-details']
            }"
            v-if="isLoaded && showDetails"
            :previous_close_price="formatters.formatCurrency(quote.previous_close_price)"
            :day_low_price="formatters.formatCurrency(quote.day_low_price)"
            :day_high_price="formatters.formatCurrency(quote.day_high_price)"
            :dividend_yield="formatters.formatPercent(quote.dividend_yield)"
            :bid="formatters.formatCurrency(quote.bid)"
            :ask="formatters.formatCurrency(quote.ask)"
            :pe_ratio="formatters.formatPercent(quote.pe_ratio)"
            :exchange="quote.exchange"
            :volume="quote.volume"
        >
            <div class="fb-quote-detail-details">
                <ul>
                    <li v-if="quote.previous_close_price" data-field="previous_close_price">
                        <label>{{ labels.previous_close_price }}</label>
                        <span>{{ formatters.formatCurrency(quote.previous_close_price) }}</span>
                    </li>
                    <li v-if="quote.day_high_price && quote.day_low_price" data-field="day_range">
                        <label>{{ labels.day_range }}</label>
                        <span>{{ formatters.formatCurrency(quote.day_low_price) }} - {{ formatters.formatCurrency(quote.day_high_price) }}</span>
                    </li>
                    <li v-if="quote.volume" data-field="volume">
                        <label>{{ labels.volume }}</label>
                        <span>{{ quote.volume }}</span>
                    </li>
                    <li v-if="quote.pe_ratio" data-field="pe_ratio">
                        <label>{{ labels.pe_ratio }}</label>
                        <span>{{ quote.pe_ratio }}</span>
                    </li>
                    <li v-if="quote.dividend_yield" data-field="dividend_yield">
                        <label>{{ labels.dividend_yield }}</label>
                        <span>{{ formatters.formatPercent(quote.dividend_yield) }}</span>
                    </li>
                    <li v-if="quote.bid && quote.ask" data-field="bid_ask">
                        <label>{{ labels.bid }} / {{ labels.ask }}</label>
                        <span>{{ formatters.formatCurrency(quote.bid) }} / {{ formatters.formatCurrency(quote.ask) }}</span>
                    </li>
                    <li v-if="quote.exchange" data-field="exchange">
                        <label>{{ labels.exchange }}</label>
                        <span>{{ quote.exchange }}</span>
                    </li>
                </ul>
            </div>
        </slot>
    </div>
</template>
<script setup>
// imports
import { ref, computed, onBeforeMount, watch } from "vue";
import * as formatters from "@/modules/useFormatter";
import * as componentClasses from "@/modules/useCommonCSS";

// vars
const props = defineProps({
    show: {
        type: Boolean,
        default: true,
        desc: "Toggle the display of the quote detail"
    },
    showDetails: {
        type: Boolean,
        default: true,
        desc: "Show the quote details section"
    },
    callback: {
        type: Function,
        default: null,
        desc: "A callback function used to return the quote detail props."
    },
    callbackOn: {
        type: String,
        default: null,
        validator(value) {
            // The value must match one of these strings
            return ["mount","show"].includes(value)
        },
        desc: "Execute callback when component is mounted or shown."
    },
    symbol: {
        type: String,
        default: null,
        desc: "The quoted security symbol"
    },
    security_description: {
        type: String,
        default: null,
        desc: "The quoted security description."
    },
    current_price: {
        type: Number,
        default: null,
        desc: "The current price of the security."
    },
    price_change_amt: {
        type: Number,
        default: null,
        desc: "The change in price as a dollar amount."
    },
    price_change_pct: {
        type: Number,
        default: null,
        desc: "The change in price as a percent."
    },
    previous_close_price: {
        type: Number,
        default: null,
        desc: "The previous closing price."
    },
    day_high_price: {
        type: Number,
        default: null,
        desc: "The day's high price."
    },
    day_low_price: {
        type: Number,
        default: null,
        desc: "The day's low price."
    },
    exchange: {
        type: String,
        default: null,
        desc: "The exchange the security is traded on."
    },
    volume: {
        type: String,
        default: null,
        desc: "The security's trade volume."
    },
    bid: {
        type: Number,
        default: null,
        desc: "The bid price."
    },
    ask: {
        type: Number,
        default: null,
        desc: "The ask price."
    },
    pe_ratio: {
        type: Number,
        default: null,
        desc: "The price/earning ratio."
    },
    dividend_yield: {
        type: Number,
        default: null,
        desc: "The security's dividend yield."
    },
    labels: {
        type: Object,
        default: () => {
            return {
                previous_close_price: "Previous Close",
                day_range: "Day Range",
                exchange: "Exchange",
                volume: "Volume",
                bid: "Bid",
                ask: "Ask",
                pe_ratio: "P/E Ratio",
                dividend_yield: "Dividend Yield",
            }
        },
        desc: "An object of text labels to apply to the data points."
    }
});
const emit = defineEmits([
    'fb-quote-detail',
    'fb-quote-detail-before-mount',
    'fb-quote-detail-show',
    'fb-quote-detail-loaded',
]);
// temp object to contain data from callback
const callbackQuote = ref({});
const isCallbackLoaded = ref(false);

const isLoaded = computed(() => {
    if (props.callback) {
        return isCallbackLoaded.value;
    } else {
        return quote.value.symbol && quote.value.security_description;
    }
});

const quote = computed(() => {
    return {
        ...props,
        ...callbackQuote.value
    }
});


onBeforeMount(async () => {
    if (props.callbackOn === "mount") {
        triggerCallback();
    }
    emit('fb-quote-detail-before-mount', props.symbol);
})



// methods
const onShow = async () => {
    if (props.callbackOn === "show") {
        triggerCallback();
    }
    emit('fb-quote-detail-show', props.symbol);
}

const triggerCallback = async () => {
     if (typeof props.callback === 'function') {
        isCallbackLoaded.value = false;
        callbackQuote.value = {};
        callbackQuote.value = await props.callback(props.symbol);
        if (Object.keys(callbackQuote.value).length > 0) {
            isCallbackLoaded.value = true;
            emit('fb-quote-detail-loaded',true);
        }
    }
}

const priceChangePctClass = computed(() => {
    return quote.value.price_change_pct < 0 ? 'fb-negative' : 'fb-positive';
})
const priceChangeAmtClass = computed(() => {
    return quote.value.price_change_amt < 0 ? 'fb-negative' : 'fb-positive';
})
/**
 * watch the show prop and trigger the show method when it updated
 */
watch(() => props.show, (value, prevValue) => {
  if (value === true) {
    onShow();
  }
}, { immediate: true })
</script>
<style lang="scss" scoped>

.fb-quote-detail-details ul {
    list-style: none;
    padding: unset;
    margin: unset;
}
</style>