<template>
    <Story
        title="Advisor/Clients/ClientCard/ClientCardName"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.client" title="client" />
            <PropDesc :component="ClientCardRoot" prop="client" />
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
                    <ClientCardName :as="state.as" />
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
                    <ClientCardName as="div" #default="{first_name, last_name}">
                        <h2 class="tw-inline">Name:</h2> {{ last_name }}, {{ first_name }}
                    </ClientCardName>
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
import ClientCardName from '@/components/Advisor/Clients/ClientCard/ClientCardName/ClientCardName.vue'


const state = reactive({
    as: defaultValue(ClientCardName, 'as'),
    client: useClientData()
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>