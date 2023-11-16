<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-portfolio-summary-card">
        <slot
            name="default"
            :props="props"
            :currentValue="formatters.formatCurrency(props.currentValue)"
            :cashValue="formatters.formatCurrency(cashValue)"
            :securitiesValue="formatters.formatCurrency(securitiesValue)"
            :changeAmountPct="formatters.formatPercent(changeAmountPct)"
            :changeAmount="formatters.formatCurrency(changeAmount)"
            :changeClasses="changeClasses(changeAmount)"
        >
            <dl>
                <dt class="fb-portfolio-summary-card-current-value-label">{{ currentValueLabel }}</dt>
                <dd class="fb-portfolio-summary-card-current-value">{{ formatters.formatCurrency(currentValue) }}</dd>
                <dt class="fb-portfolio-summary-card-cash-label">{{ cashLabel }}</dt>
                <dd class="fb-portfolio-summary-card-cash">{{ formatters.formatCurrency(cashValue) }}</dd>
                <dt class="fb-portfolio-summary-card-securities-label">{{ securitiesLabel }}</dt>
                <dd class="fb-portfolio-summary-card-securities">{{ formatters.formatCurrency(securitiesValue) }}</dd>
                <dt class="fb-portfolio-summary-card-change-label">{{ changeLabel }}</dt>
                <dd
                    class="fb-portfolio-summary-card-change"
                    :class="changeClasses(changeAmount)"
                >
                    {{ formatters.formatCurrency(changeAmount) }} ({{formatters.formatPercent(changeAmountPct)}})
                </dd>
            </dl>
        </slot>
    </div>
</template>
<script setup>
// imports
import * as formatters from "@/modules/useFormatter";
import { computed } from "vue";

// vars
const props = defineProps({
    currentValueLabel: {
        type: String,
        default: "Current Value"
    },
    cashLabel: {
        type: String,
        default: "Cash"
    },
    securitiesLabel: {
        type: String,
        default: "Holdings"
    },
    changeLabel: {
        type: String,
        default: "Today's Change"
    },
    currentValue: {
        type: String,
        default: ""
    },
    cashValue: {
        type: String,
        default: ""
    },
    securitiesValue: {
        type: String,
        default: ""
    },
    changeAmount: {
        type: String,
        default: ""
    },
});
const changeAmountPct = computed(() => parseFloat((props.changeAmount / props.securitiesValue) * 100));


// methods
const changeClasses = (value) => {
    return parseFloat(value) < 0 ? "fb-negative" : "fb-positive";
}

</script>
<style lang="scss" scoped>
@import "../../../scss/finbloxui.scss";
::v-deep(dl) {
    display: grid;
    grid-template-columns: 33% auto;
    dt {
        grid-column: 1;
        white-space: nowrap;
    }
    dd {
        text-align: right;
        grid-column: 2;
    }
}
</style>