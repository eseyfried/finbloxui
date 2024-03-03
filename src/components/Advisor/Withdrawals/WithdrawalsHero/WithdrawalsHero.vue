<template>
    <Primitive
        ref="primitiveElement" :as-child="asChild" :as="as"
        class="fb-withdrawals-hero" :class="componentClasses.getClassByType('component')"
    >
        <slot
            :totalAmount="rootContext.totalAmount"
            :label="rootContext.label"
            :transactions="rootContext.transactions"
            :asOf="rootContext.asOf"
            :showDate="rootContext.showDate"
        >
            <h2>{{ formatters.formatCurrency(rootContext.totalAmount) }}</h2>
            <h3>{{ rootContext.label }}</h3>
            <h4 v-if="rootContext.showDate">As of: {{ formatters.formatDate(rootContext.asOf) }}</h4>
        </slot>
    </Primitive>
</template>
<script setup>
import * as formatters from "@/modules/useFormatter";
import * as componentClasses from "@/modules/useCommonCSS";
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive';
import { injectWithdrawalsRootContext } from '../WithdrawalsRoot.vue'

const rootContext = injectWithdrawalsRootContext()
defineProps(PrimitiveProps)
</script>