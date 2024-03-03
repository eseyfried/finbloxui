<template>
    <Story
        title="Advisor/Clients/ClientCard/ClientCardDataLabel"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.client" title="client" />
            <PropDesc :component="ClientCardRoot" prop="client" />
            <PropDesc :component="ClientCardDataLabel" prop="index" />
            <HstText type="text" v-model="state.as" title="as" />
        </template>

        <Variant
            title="Default"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <ClientCardRoot
                    :client="state.client"
                >
                    <ClientCardDataList #default="{data}">
                        <ClientCardDataListItem  v-for="(stat, i) in data" :key="i">
                            <ClientCardDataLabel :as="state.as" :index="i" />
                        </ClientCardDataListItem>
                    </ClientCardDataList>
                </ClientCardRoot>
            </template>
        </Variant>
        <Variant
            title="Custom Layout"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <ClientCardRoot
                    :client="state.client"
                >
                    <ClientCardDataList #default="{data}">
                        <ClientCardDataListItem  v-for="(stat, i) in data" :key="i">
                            <ClientCardDataLabel :as="state.as" :index="i" #default="{label}">
                                <strong>{{ label }}</strong>
                            </ClientCardDataLabel>
                        </ClientCardDataListItem>
                    </ClientCardDataList>
                </ClientCardRoot>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useClientData } from "@/../.histoire/modules/useClientData";
import PropDesc from '@/../.histoire/components/PropDesc';


import ClientCardRoot from '@/components/Advisor/Clients/ClientCard/ClientCardRoot.vue'
import ClientCardDataList from '@/components/Advisor/Clients/ClientCard/ClientCardDataList/ClientCardDataList.vue'
import ClientCardDataListItem from '@/components/Advisor/Clients/ClientCard/ClientCardDataListItem/ClientCardDataListItem.vue'
import ClientCardDataLabel from '@/components/Advisor/Clients/ClientCard/ClientCardDataLabel/ClientCardDataLabel.vue'

const state = reactive({
    as: defaultValue(ClientCardDataLabel, 'as'),
    client: useClientData()
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>