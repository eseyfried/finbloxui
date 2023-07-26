<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-quote-detail">
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
            :symbol="symbol.toUpperCase()"
            :security_description="security_description"
        >
            <div class="fb-quote-detail-heading">
                <h3>{{ security_description }} ({{ symbol.toUpperCase() }})</h3>
            </div>
        </slot>
        <slot name="price"
            :props="props"
            v-if="isLoaded"
            :attrs="{
                class: ['fb-quote-detail-price']
            }"
            :current_price="formatters.formatCurrency(current_price)"
            :price_change_pct="formatters.formatPercent(price_change_pct)"
            :price_change_amt="formatters.formatCurrency(price_change_amt)"
            :price_change_pct_css="priceChangePctClass"
            :price_change_amt_css="priceChangeAmtClass"
        >
            <div class="fb-quote-detail-price">
                <h4>{{ formatters.formatCurrency(current_price) }}</h4>
                <span
                    :class="priceChangePctClass"
                >
                    {{ formatters.formatPercent(price_change_pct) }}
                </span>
                <span
                    :class="priceChangeAmtClass"
                >
                    {{ formatters.formatCurrency(price_change_amt) }}
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
            :previous_close_price="formatters.formatCurrency(previous_close_price)"
            :day_low_price="formatters.formatCurrency(day_low_price)"
            :day_high_price="formatters.formatCurrency(day_high_price)"
            :dividend_yield="formatters.formatPercent(dividend_yield)"
            :bid="formatters.formatCurrency(bid)"
            :ask="formatters.formatCurrency(ask)"
        >
            <div class="fb-quote-detail-details">
                <dl>
                    <dt v-if="previous_close_price">{{ labels.previous_close_price }}</dt>
                    <dd v-if="previous_close_price">{{ formatters.formatCurrency(previous_close_price) }}</dd>
                    <dt v-if="day_high_price && day_low_price">{{ labels.day_range }}</dt>
                    <dd v-if="day_high_price && day_low_price">{{ formatters.formatCurrency(day_low_price) }} - {{ formatters.formatCurrency(day_high_price) }}</dd>
                    <dt v-if="volume">{{ labels.volume }}</dt>
                    <dd v-if="volume">{{ volume }}</dd>
                    <dt v-if="pe_ratio">{{ labels.pe_ratio }}</dt>
                    <dd v-if="pe_ratio">{{ pe_ratio }}</dd>
                    <dt v-if="dividend_yield">{{ labels.dividend_yield }}</dt>
                    <dd v-if="dividend_yield">{{ formatters.formatPercent(dividend_yield) }}</dd>
                    <dt v-if="bid && ask">{{ labels.bid }} / {{ labels.ask }}</dt>
                    <dd v-if="bid && ask">{{ formatters.formatCurrency(bid) }} / {{ formatters.formatCurrency(ask) }}</dd>
                    <dt v-if="exchange">{{ labels.exchange }}</dt>
                    <dd v-if="exchange">{{ exchange }}</dd>
                </dl>
            </div>
        </slot>
    </div>
</template>
<script setup>
// imports
import { computed, onBeforeMount } from "vue";
import * as formatters from "@/modules/useFormatter";

// vars
const props = defineProps({
    showDetails: {
        type: Boolean,
        default: true
    },
    symbol: {
        type: String,
        default: null,
    },
    security_description: {
        type: String,
        default: null,
    },
    current_price: {
        type: Number,
        default: null,
    },
    price_change_amt: {
        type: Number,
        default: null
    },
    price_change_pct: {
        type: Number,
        default: null
    },
    previous_close_price: {
        type: Number,
        default: null,
    },
    day_high_price: {
        type: Number,
        default: null,
    },
    day_low_price: {
        type: Number,
        default: null,
    },
    exchange: {
        type: String,
        default: null,
    },
    volume: {
        type: Number,
        default: null,
    },
    bid: {
        type: Number,
        default: null,
    },
    ask: {
        type: Number,
        default: null,
    },
    pe_ratio: {
        type: Number,
        default: null,
    },
    dividend_yield: {
        type: Number,
        default: null,
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
        }
    }
});
const emit = defineEmits([
    'fb-quote-detail',
    'fb-quote-detail-before-mount'
]);

const isLoaded = computed(() => {
    return props.symbol && props.security_description;
});

onBeforeMount(() => {
    emit('fb-quote-detail-before-mount');
})

// methods
const priceChangePctClass = computed(() => {
    return props.price_change_pct < 0 ? 'fb-negative' : 'fb-positive';
})
const priceChangeAmtClass = computed(() => {
    return props.price_change_amt < 0 ? 'fb-negative' : 'fb-positive';
})
</script>
<style lang="scss" scoped>
</style>