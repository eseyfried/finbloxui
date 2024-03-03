<template>
    <Primitive
        ref="primitiveElement" :as-child="asChild" :as="as"
        class="fb-deposits-transactions" :class="componentClasses.getClassByType('component')"
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
                        <th class="fb-deposits-transactions-desc">{{ rootContext.descriptionLabel }}</th>
                        <th class="fb-deposits-transactions-date">{{ rootContext.dateLabel }}</th>
                        <th class="fb-deposits-transactions-amount">{{ rootContext.amountLabel }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(record, i) in rootContext.transactions" :key="i">
                        <td class="fb-deposits-transactions-desc">{{ record.description }}</td>
                        <td class="fb-deposits-transactions-date">{{ formatters.formatDate(record.transaction_date) }}</td>
                        <td class="fb-deposits-transactions-amount">{{ formatters.formatCurrency(record.amount) }}</td>
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
import { injectDepositsRootContext } from '../DepositsRoot.vue'

const rootContext = injectDepositsRootContext()
defineProps(PrimitiveProps)
</script>