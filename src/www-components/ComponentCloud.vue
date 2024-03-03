<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="tw-relative">
        <div id="ytdAum" class="position">
            <DataPoint />
        </div>
        <div id="quoteDetail">
            <QuoteDetail
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
            />
        </div>
        <div id="clientCard">
            <ClientCard />
        </div>
    </div>
</template>
<script setup>
import DataPoint from "@/www-components/DataPoint";
import QuoteDetail from "@/components/Core/QuoteDetail/QuoteDetail";
import ClientCard from "@/www-components/ClientCard";


</script>
<style lang="scss" scoped>



#quoteDetail:deep(.fb-quote-detail) {
    @apply tw-shadow-md tw-p-3 tw-rounded tw-border-yellow-300 tw-border-2 tw-bg-white tw-text-black;
    
    .fb-quote-detail-heading h3 {
        @apply tw-text-lg tw-font-semibold;
    }
    .fb-quote-detail-price {
        display: flex;
        @apply tw-items-end tw-my-2;
    }
    .fb-quote-detail-price h4 {
        @apply tw-text-xl tw-p-0 tw-m-0;
        line-height: inherit;
    }
    .fb-quote-detail-price h4,
    .fb-quote-detail-price span {
        margin-right: .5rem;
    }
    .fb-quote-detail-price span {
        line-height: normal;
    }
    .fb-quote-detail-details li label::after {
        content: ":";
    }
    .fb-quote-detail-details li {
        display: flex;
        justify-content: space-between;
    }
}

#ytdAum {
    &.position {
        @apply tw-absolute -tw-top-4 tw-left-24 floating slow;
    }
    @apply tw-z-20;
}
#quoteDetail {
    @apply tw-absolute tw-top-[150px] -tw-left-[120px] tw-w-[400px] tw-z-10 floating fast;
}

#clientCard {
    @apply tw-absolute tw-top-[134px] tw-w-[500px] tw-left-[320px] tw-z-10 floating medium;
}


.floating { 
    animation-name: floating;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-left: 30px;
    margin-top: 5px;
}
.fast {
    animation-duration: 5s;
}
.medium {
    animation-duration: 8s;
}
.slow {
    animation-duration: 11s;
}
 
@keyframes floating {
    0% { transform: translate(0,  0px); }
    50%  { transform: translate(0, 15px); }
    100%   { transform: translate(0, -0px); }   
}
</style>