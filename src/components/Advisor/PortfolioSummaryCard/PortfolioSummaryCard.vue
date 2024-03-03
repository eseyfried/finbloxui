<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        class="fb-portfolio-summary-card"
        :class="componentClasses.getClassByType('component')"
    >
        <slot
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
    </Primitive>
</template>
<script>
const PortfolioSummaryCardProps = mergeProps(
    PrimitiveProps,
    {
        currentValueLabel: {
            type: String,
            default: "Current Value",
            desc: "Text label for the current value field"
        },
        cashLabel: {
            type: String,
            default: "Cash",
            desc: "Text label for the cash value field"
        },
        securitiesLabel: {
            type: String,
            default: "Holdings",
            desc: "Text label for the securities value field"
        },
        changeLabel: {
            type: String,
            default: "Today's Change",
            desc: "Text label for the today's change value field"
        },
        currentValue: {
            type: Number,
            default: "",
            desc: "The unformatted current value"
        },
        cashValue: {
            type: Number,
            default: "",
            desc: "The unformatted cash value"
        },
        securitiesValue: {
            type: Number,
            default: "",
            desc: "The unformatted securities value"
        },
        changeAmount: {
            type: Number,
            default: "",
            desc: "The unformatted change in amount value"
        },
    }
);
</script>
<script setup>
// imports
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'
import * as formatters from "@/modules/useFormatter";
import { computed, mergeProps } from "vue";
import * as componentClasses from "@/modules/useCommonCSS";

// vars

const props = defineProps(PortfolioSummaryCardProps)
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