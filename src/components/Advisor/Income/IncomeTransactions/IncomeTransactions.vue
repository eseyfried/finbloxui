<template>
    <Primitive
        ref="primitiveElement" :as-child="asChild" :as="as"
        class="fb-income-transactions" :class="componentClasses.getClassByType('component')"
    >
        <slot
            :transactions="rootContext.transactions"
            :descriptionLabel="rootContext.descriptionLabel"
            :dateLabel="rootContext.dateLabel"
            :amountLabel="rootContext.amountLabel"
            :showTransactions="rootContext.showTransactions"
        >
            <table>
                <thead>
                    <tr>
                        <th class="fb-income-transactions-desc">{{ rootContext.descriptionLabel }}</th>
                        <th class="fb-income-transactions-date">{{ rootContext.dateLabel }}</th>
                        <th class="fb-income-transactions-amount">{{ rootContext.amountLabel }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(record, i) in rootContext.transactions" :key="i">
                        <td class="fb-income-transactions-desc">{{ record.description }}</td>
                        <td class="fb-income-transactions-date">{{ formatters.formatDate(record.transaction_date) }}</td>
                        <td class="fb-income-transactions-amount">{{ formatters.formatCurrency(record.amount) }}</td>
                    </tr>
                </tbody>
            </table>
        </slot>
    </Primitive>
</template>
<script setup>
import * as formatters from "@/modules/useFormatter";
import * as componentClasses from "@/modules/useCommonCSS";
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive';
import { injectIncomeRootContext } from '../IncomeRoot.vue'

const rootContext = injectIncomeRootContext()
defineProps(PrimitiveProps)
</script>