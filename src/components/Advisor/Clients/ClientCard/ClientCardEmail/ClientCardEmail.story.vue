<template>
    <Story
        title="Advisor/Clients/ClientCard/ClientCardEmail"
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
                    <ClientCardEmail :as="state.as" />
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
                    <ClientCardEmail :as="state.as">
                        <div><ClientCardEmailLink /></div>
                        <div><ClientCardEmailLabel /></div>
                    </ClientCardEmail>
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
import ClientCardEmail from '@/components/Advisor/Clients/ClientCard/ClientCardEmail/ClientCardEmail.vue'
import ClientCardEmailLabel from '@/components/Advisor/Clients/ClientCard/ClientCardEmailLabel/ClientCardEmailLabel.vue'
import ClientCardEmailLink from '@/components/Advisor/Clients/ClientCard/ClientCardEmailLink/ClientCardEmailLink.vue'

const state = reactive({
    as: defaultValue(ClientCardEmail, 'as'),
    client: useClientData()
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>