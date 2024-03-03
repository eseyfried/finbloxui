<!-- eslint-disable vue/valid-template-root -->
<template>
    <div>
        <QuoteDetail
            id="quoteDetail"
            symbol="AAPL"
            security_description="Apple, Inc."
            current_price="192.75"
            price_change_amt="-0.81"
            price_change_pct="0.42"
            previous_close_price="191.94"
            day_low_price="192.25"
            day_high_price="194.91"
            exchange="NASDAQ"
            volume="5.38M"
            bid="192.75"
            ask="191.75"
            pe_ratio="32.75"
            dividend_yield="0.50"
            :showDetails="true"
        >
            <template #heading="slotProps">
                <div v-bind="slotProps.attrs">
                    <h3>{{ slotProps.security_description }}</h3>
                    <h4><span>{{ slotProps.props.exchange }}:</span>{{ slotProps.symbol }}</h4>
                </div>
            </template>
            <template #price="slotProps">
                <div v-bind="slotProps.attrs">
                    <h4>{{ slotProps.current_price }}</h4>
                    <div>
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
            <!-- <template #details="slotProps">
                <div v-bind="slotProps.attrs">
                    <table>
                        <tr>
                            <th>Open</th>
                            <td>{{ slotProps.previous_close_price }}</td>
                        </tr>
                        <tr>
                            <th>High</th>
                            <td>{{ slotProps.day_high_price }}</td>
                        </tr>
                        <tr>
                            <th>Low</th>
                            <td>{{ slotProps.day_low_price }}</td>
                        </tr>
                    </table>
                </div>
            </template> -->
        </QuoteDetail>
    </div>
</template>
<script setup>
import QuoteDetail from "@/components/Core/QuoteDetail/QuoteDetail";
</script>
<style lang="scss" scoped>
div:deep(.fb-quote-detail) {
    @apply tw-shadow-2xl tw-shadow-gray-950 tw-p-3 tw-rounded-lg tw-border-teal-500 tw-border-2 tw-bg-white tw-text-black md:tw-w-[400px];
    
    .fb-quote-detail-heading h3 {
        @apply tw-text-3xl tw-font-semibold;
    }
    .fb-quote-detail-heading h4 {
        @apply tw-text-sm tw-font-semibold tw-pb-2 tw-border-b tw-text-gray-500;
        span {
            @apply tw-mr-2;
        }
    }
    .fb-quote-detail-price {
        display: flex;
        @apply tw-mt-2 tw-p-2 tw-flex-col;
    }
    .fb-quote-detail-price h4 {
        @apply tw-text-2xl tw-font-semibold tw-p-0 tw-m-0;
        line-height: inherit;
    }
    .fb-quote-detail-price h4,
    .fb-quote-detail-price span {
        margin-right: .5rem;
    }
    .fb-quote-detail-price span {
        line-height: normal;
    }
    .fb-quote-detail-details {
        @apply tw-bg-white tw-p-2;
    }
    .fb-quote-detail-details li label::after {
        content: ":";
    }
    .fb-quote-detail-details li {
        display: flex;
        justify-content: space-between;
        span {
            @apply tw-text-gray-500;
        }
    }
}
</style>