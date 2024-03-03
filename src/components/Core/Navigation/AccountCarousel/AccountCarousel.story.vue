<template>
    <Story
        title="Navigation/Accounts/AccountCarousel"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.accounts" title="accounts" />
            <PropDesc :component="AccountCarousel" prop="accounts" />
            <HstText v-model="state.numVisibile" title="numVisibile" />
            <PropDesc :component="AccountCarousel" prop="numVisibile" />
            <HstText v-model="state.numScroll" title="numScroll" />
            <PropDesc :component="AccountCarousel" prop="numScroll" />
            <HstCheckbox v-model="state.showLabels" title="showLabels" />
            <PropDesc :component="AccountCarousel" prop="showLabels" />
            <HstText v-model="state.defaultAccountId" title="defaultAccountId" />
            <PropDesc :component="AccountCarousel" prop="defaultAccountId" />
            <HstText v-model="state.totalMarketValueLabel" title="totalMarketValueLabel" />
            <PropDesc :component="AccountCarousel" prop="totalMarketValueLabel" />
            <HstText v-model="state.changeInValueLabel" title="changeInValueLabel" />
            <PropDesc :component="AccountCarousel" prop="changeInValueLabel" />
            <HstText v-model="state.accountNameLabel" title="accountNameLabel" />
            <PropDesc :component="AccountCarousel" prop="accountNameLabel" />
            <HstText v-model="state.accountNumberLabel" title="accountNumberLabel" />
            <PropDesc :component="AccountCarousel" prop="accountNumberLabel" />
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <AccountCarousel
                        :accounts="state.accounts"
                        :numVisibile="state.numVisibile"
                        :numScroll="state.numScroll"
                        :showLabels="state.showLabels"
                        :defaultAccountId="state.defaultAccountId"
                        :totalMarketValueLabel="state.totalMarketValueLabel"
                        :changeInValueLabel="state.changeInValueLabel"
                        :accountNameLabel="state.accountNameLabel"
                        :accountNumberLabel="state.accountNumberLabel"
                    />
                </div>
            </template>
        </Variant>
        <Variant title="Default Selected Account" :init-state="() => initState({ 'defaultAccountId': 5 })">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <AccountCarousel
                        :accounts="state.accounts"
                        :numVisibile="state.numVisibile"
                        :numScroll="state.numScroll"
                        :showLabels="state.showLabels"
                        :defaultAccountId="state.defaultAccountId"
                        :totalMarketValueLabel="state.totalMarketValueLabel"
                        :changeInValueLabel="state.changeInValueLabel"
                        :accountNameLabel="state.accountNameLabel"
                        :accountNumberLabel="state.accountNumberLabel"
                    />
                </div>
            </template>
        </Variant>
        <Variant title="Select Account Event" :init-state="() => initState()">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <AccountCarousel
                        :accounts="state.accounts"
                        :numVisibile="state.numVisibile"
                        :numScroll="state.numScroll"
                        :showLabels="state.showLabels"
                        :defaultAccountId="state.defaultAccountId"
                        :totalMarketValueLabel="state.totalMarketValueLabel"
                        :changeInValueLabel="state.changeInValueLabel"
                        :accountNameLabel="state.accountNameLabel"
                        :accountNumberLabel="state.accountNumberLabel"
                        @fb-account-carousel:click="handleClick"
                    />
                </div>
            </template>
        </Variant>

        
        
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import PropDesc from '@/../.histoire/components/PropDesc';
import { logEvent } from 'histoire/client'
import { faker } from "@faker-js/faker";

import AccountCarousel from '@/components/Core/Navigation/AccountCarousel/AccountCarousel';

const accounts = Array.from(Array(5).keys(), (i) => {
    return {
        "id": (i+1),
        "number": faker.finance.accountNumber(8),
        "name": faker.helpers.arrayElement([`Retirement ${i+1}`, `401 k ${i+1}`, `Taxable ${i+1}`, `Trust ${i+1}`]),
        "total_market_value": faker.finance.amount({ min: 250000, max: 100000000, dec: 2 }),
        "change_in_value_amt": faker.finance.amount({ min: 50000, max: 100000, dec: 2 }),
        "change_in_value_pct": faker.finance.amount({ min: 10, max: 43, dec: 2 }),
    }
})




const state = reactive({
    accounts: defaultValue(AccountCarousel, 'accounts', accounts),
    numVisibile: defaultValue(AccountCarousel, 'numVisibile'),
    numScroll: defaultValue(AccountCarousel, 'numScroll'),
    showLabels: defaultValue(AccountCarousel, 'showLabels'),
    defaultAccountId: defaultValue(AccountCarousel, 'defaultAccountId'),
    totalMarketValueLabel: defaultValue(AccountCarousel, 'totalMarketValueLabel'),
    changeInValueLabel: defaultValue(AccountCarousel, 'changeInValueLabel'),
    accountNameLabel: defaultValue(AccountCarousel, 'accountNameLabel'),
    accountNumberLabel: defaultValue(AccountCarousel, 'accountNumberLabel'),
})

const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

const handleClick = (account) => {
    logEvent('fb-account-carousel:click', account)
    alert(`fb-account-carousel:click event called with account ${JSON.stringify(account)}`)
}
</script>