<template>
    <Story
        title="Advisor/Clients/ClientCard/ClientCardAction"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.client" title="client" />
            <PropDesc :component="ClientCardRoot" prop="client" />
            <HstText type="text" v-model="state.as" title="as" />
            <HstText type="text" v-model="state.actionLabel" title="actionLabel" />
        </template>

        <Variant
            title="Default"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <ClientCardRoot
                    :client="state.client"
                    :actionLabel="state.actionLabel"
                >
                    <ClientCardAction :as="state.as" />
                </ClientCardRoot>
            </template>
        </Variant>
        <Variant
            title="Custom Layout"
            :init-state="() => initState({ as: 'button' })"
        >
            <template #default="{state}">
                <ClientCardRoot
                    :client="state.client"
                    :actionLabel="state.actionLabel"
                    @fb-client-card-action-link:click="handleActionClick"
                >
                    <ClientCardAction :as="state.as" #default="{ actionLabel }">
                        {{ actionLabel }}
                    </ClientCardAction>
                </ClientCardRoot>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { logEvent } from 'histoire/client'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useClientData } from "@/../.histoire/modules/useClientData";
import PropDesc from '@/../.histoire/components/PropDesc';


import ClientCardRoot from '@/components/Advisor/Clients/ClientCard/ClientCardRoot.vue'
import ClientCardAction from '@/components/Advisor/Clients/ClientCard/ClientCardAction/ClientCardAction.vue'

const state = reactive({
    as: defaultValue(ClientCardAction, 'as'),
    actionLabel: defaultValue(ClientCardRoot, 'actionLabel'),
    client: useClientData()
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}
const handleActionClick = (client) => { alert(`Action link was clicked with client ${JSON.stringify(client)}`); logEvent('@fb-client-card-action-link:click',client) }
</script>