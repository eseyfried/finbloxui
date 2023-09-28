<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="relative">
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
    @apply shadow-md p-3 rounded border-yellow-300 border-2 bg-white text-black;
    
    .fb-quote-detail-heading h3 {
        @apply text-lg font-semibold;
    }
    .fb-quote-detail-price {
        display: flex;
        @apply items-end my-2;
    }
    .fb-quote-detail-price h4 {
        @apply text-xl p-0 m-0;
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
        @apply absolute -top-4 left-24 floating slow;
    }
    @apply z-20;
}
#quoteDetail {
    @apply absolute top-[150px] -left-[120px] w-[400px] z-10 floating fast;
}

#clientCard {
    @apply absolute top-[134px] w-[500px] left-[320px] z-10 floating medium;
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