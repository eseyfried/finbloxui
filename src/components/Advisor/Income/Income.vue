<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-income">
        <slot name="hero" :props="props">
            <div class="fb-income-hero">
                <h2>{{ formatters.formatCurrency(totalIncome) }}</h2>
                <h3>{{ label }}</h3>
                <h4 v-if="showDate">As of: {{ formatters.formatDate(asOf) }}</h4>
            </div>
        </slot>
        <slot
            v-if="showTransactions"
            name="transactions"
            :props="props"
            :data="transactions"
        >
            <div class="fb-income-transactions">
                <table>
                    <thead>
                        <tr>
                            <th class="fb-income-transactions-desc">{{ descriptionLabel }}</th>
                            <th class="fb-income-transactions-date">{{ dateLabel }}</th>
                            <th class="fb-income-transactions-amount">{{ amountLabel }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(record, i) in transactions" :key="i">
                            <td class="fb-income-transactions-desc">{{ record.description }}</td>
                            <td class="fb-income-transactions-date">{{ formatters.formatDate(record.date) }}</td>
                            <td class="fb-income-transactions-amount">{{ formatters.formatCurrency(record.amount) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </slot>
    </div>
</template>
<script setup>
// imports
import { computed } from "vue";
import { sortBy } from "lodash";
import * as formatters from "@/modules/useFormatter";

// vars
const props = defineProps({
    label: {
        type: String,
        default: "Income"
    },
    data: {
        type: Array,
        default: () => []
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
        default: "Security Description"
    },
    dateLabel: {
        type: String,
        default: "Date"
    },
    amountLabel: {
        type: String,
        default: "Amount"
    }
});

// methods
const totalIncome = computed(() => props.data.reduce((partialSum, a) => parseFloat(partialSum) + parseFloat(a.amount), 0));
const transactions = computed(() => sortBy(props.data, "date").reverse());
const asOf = computed(() => transactions.value[0]?.date);
</script>
<style lang="scss" scoped>
:is(h2, h3) {
    margin: 0;
}
.fb-income {
    .fb-income-transactions {
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