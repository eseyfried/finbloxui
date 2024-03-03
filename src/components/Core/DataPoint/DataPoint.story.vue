<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

import { reactive } from 'vue'
import { logEvent } from 'histoire/client'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";

import DataPointRoot from '@/components/Core/DataPoint/DataPointRoot';
import DataPointLabel from '@/components/Core/DataPoint/DataPointLabel';
import DataPointValue from '@/components/Core/DataPoint/DataPointValue';
import DataPointTrend from '@/components/Core/DataPoint/DataPointTrend';



const state = reactive({
    as: defaultValue(DataPointRoot, 'as'),
    dataPoint: {
            label: "YTD AUM",
            value: "12345678.90",
            format: "currency",
            trend: {
                format: "currency",
                value: 14526.34,
                direction: "up"
            }
        },
    actionLabel: defaultValue(DataPointRoot, 'actionLabel'),
    showAction: defaultValue(DataPointRoot, 'showAction'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}
const handleActionClick = ($event) => {
    logEvent("@fb-data-point-action-link:click", $event)
}
</script>
<template>
    <Story
        title="Core/DataPoint/DataPointRoot"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstJson v-model="state.dataPoint" title="dataPoint" />
            <HstText type="text" v-model="state.actionLabel" title="actionLabel" />
            <HstCheckbox v-model="state.showAction" title="showAction" />
        </template>
        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <DataPointRoot
                    :dataPoint="state.dataPoint"
                    :actionLabel="state.actionLabel"
                    :showAction="state.showAction"
                    :as="state.as"
                />
            </template>
        </Variant>

        <Variant title="Action Label" :init-state="() => initState({actionLabel: 'More'})">
            <template #default="{state}">
                <DataPointRoot
                    :dataPoint="state.dataPoint"
                    :actionLabel="state.actionLabel"
                    :showAction="state.showAction"
                    :as="state.as"
                />
            </template>
        </Variant>

        <Variant title="Hide Action" :init-state="() => initState({showAction: false})">
            <template #default="{state}">
                <DataPointRoot
                    :dataPoint="state.dataPoint"
                    :actionLabel="state.actionLabel"
                    :showAction="state.showAction"
                    :as="state.as"
                />
            </template>
        </Variant>

        <Variant title="Event" :init-state="() => initState()">
            <template #default="{state}">
                <DataPointRoot
                    :dataPoint="state.dataPoint"
                    :actionLabel="state.actionLabel"
                    :showAction="state.showAction"
                    :as="state.as"
                    @fb-data-point-action-link:click="handleActionClick"
                />
            </template>
        </Variant>

        <Variant title="Custom Layout" :init-state="() => initState()">
            <template #default="{state}">
                <DataPointRoot
                    :dataPoint="state.dataPoint"
                    :actionLabel="state.actionLabel"
                    :showAction="state.showAction"
                    :as="state.as"
                    @fb-data-point-action-link:click="handleActionClick"
                    class="tw-w-1/2"
                >
                    <div class="tw-relative tw-flex tw-flex-col tw-bg-clip-border tw-rounded-xl tw-bg-white tw-text-gray-700 tw-shadow-md">
                        <div class="tw-bg-clip-border tw-mx-4 tw-rounded-xl tw-overflow-hidden tw-bg-gradient-to-tr tw-from-green-600 tw-to-green-400 tw-text-white tw-shadow-green-500/40 tw-shadow-lg tw-absolute -tw-mt-4 tw-grid tw-h-16 tw-w-16 tw-place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
                                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                                <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd"></path>
                                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                            </svg>
                        </div>
                        <div class="tw-p-4 tw-text-right">
                            <DataPointLabel as="p" class="tw-block tw-antialiased tw-font-sans tw-text-sm tw-leading-normal tw-font-normal tw-text-blue-gray-600" />
                            <DataPointValue class="tw-block tw-antialiased tw-tracking-normal tw-font-sans text-2xl tw-font-semibold tw-leading-snug tw-text-blue-gray-900" />
                        </div>
                        <div class="tw-border-t tw-border-blue-gray-50 tw-p-4">
                            <p class="tw-block tw-antialiased tw-font-sans tw-text-base tw-leading-relaxed tw-font-normal tw-text-blue-gray-600">
                                <strong class="tw-text-green-500">
                                    <DataPointTrend />
                                </strong>&nbsp;since yesterday
                            </p>
                        </div>
                    </div>
                </DataPointRoot>
            </template>
        </Variant>
    </Story>
</template>