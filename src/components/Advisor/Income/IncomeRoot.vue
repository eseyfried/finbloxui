<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        class="fb-income"
        :class="componentClasses.getClassByType('component')"
    >
        <slot
            v-bind="props"
            :data="transactions"
        >
            <IncomeHero />
            <IncomeTransactions v-if="showTransactions" />
        </slot>
    </Primitive>
</template>
<script>
import { createContext } from '@/modules/shared';
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

export const [injectIncomeRootContext, provideIncomeRootContext] = createContext('IncomeRoot')
export const IncomeRootProps = mergeProps(
    PrimitiveProps,
    {
        label: {
            type: String,
            default: "Income",
            desc: "The text label for the hero section"
        },
        data: {
            type: Array,
            default: () => [],
            desc: "An array of transaction objects"
        },
        showTransactions: {
            type: Boolean,
            default: true
        },
        showDate: {
            type: Boolean,
            default: true
        },
        descriptionLabel: {
            type: String,
            default: "Description",
            desc: "The text label for the description column"
        },
        dateLabel: {
            type: String,
            default: "Date",
            desc: "The text label for the date column"
        },
        amountLabel: {
            type: String,
            default: "Amount",
            desc: "The text label for the amount column"
        }
    }
);
</script>
<script setup>
// imports
import { computed, mergeProps, reactive, toRef } from "vue";
import { sortBy } from "lodash";
import * as componentClasses from "@/modules/useCommonCSS";
import IncomeHero from "@/components/Advisor/Income/IncomeHero/IncomeHero"
import IncomeTransactions from "@/components/Advisor/Income/IncomeTransactions/IncomeTransactions"



// vars
const props = defineProps(IncomeRootProps)

// methods
const totalAmount = computed(() => props.data.reduce((partialSum, a) => parseFloat(partialSum) + parseFloat(a.amount), 0));
const transactions = computed(() => sortBy(props.data, "transaction_date").reverse());
const asOf = computed(() => transactions.value[0]?.transaction_date);

provideIncomeRootContext(reactive({
    label: toRef(props, 'label'),
    showDate: toRef(props, 'showDate'),
    showTransactions: toRef(props, 'showTransactions'),
    descriptionLabel: toRef(props, 'descriptionLabel'),
    dateLabel: toRef(props, 'dateLabel'),
    amountLabel: toRef(props, 'amountLabel'),
    totalAmount: totalAmount,
    transactions: transactions,
    asOf: asOf,
}))
</script>
<style lang="scss" scoped>
:is(h2, h3) {
    margin: 0;
}
.fb-income {
    ::v-deep(.fb-income-transactions) {
        overflow-y: auto;
        height: 200px;
        table {
            width: 100%;
            thead th {
                position: sticky;
                top: 0px;
            }
            th, td {
                text-align: left;
            }
            th.fb-income-transactions-amount,
            th.fb-income-transactions-date {
                text-align: right;
            }
            
            tbody {
                td.fb-income-transactions-amount,
                td.fb-income-transactions-date {
                    text-align: right;
                }
            }
        }

    }
}
</style>