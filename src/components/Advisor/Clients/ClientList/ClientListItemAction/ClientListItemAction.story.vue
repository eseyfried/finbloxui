<template>
    <Story
        title="Advisor/Clients/ClientList/ClientListItemAction"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstJson v-model="state.clients" title="clients" />
            <PropDesc :component="ClientListRoot" prop="clients" />
            <HstText type="text" v-model="state.index" title="index" />
            <PropDesc :component="ClientListItem" prop="index" />
            <HstText type="text" v-model="state.actionLabel" title="actionLabel" />
            <PropDesc :component="ClientListItem" prop="actionLabel" />     
        </template>

        <Variant
            title="Default"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <ClientListRoot
                    :clients="state.clients"
                    #default="{client, index}"
                >
                    <ClientListItem :index="index" :client="client">
                        <ClientListItemAction
                            :index="index"
                            :as="state.as"
                            :actionLabel="state.actionLabel"
                            href="#"
                        />
                    </ClientListItem>
                </ClientListRoot>
            </template>
        </Variant>
        <Variant
            title="Custom Layout"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <ClientListRoot
                    :clients="state.clients"
                    #default="{client, index}"
                >
                    <li>
                        <ClientListItemAction :index="index" :as="state.as" href="#">
                            <i>{{ state.actionLabel }}</i>
                        </ClientListItemAction>
                    </li>
                </ClientListRoot>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useClientsData } from "@/../.histoire/modules/useClientData";
import PropDesc from '@/../.histoire/components/PropDesc';

import ClientListRoot from '@/components/Advisor/Clients/ClientList/ClientListRoot.vue'
import ClientListItem from '@/components/Advisor/Clients/ClientList/ClientListItem/ClientListItem.vue'
import ClientListItemAction from '@/components/Advisor/Clients/ClientList/ClientListItemAction/ClientListItemAction.vue'


const state = reactive({
    as: defaultValue(ClientListItemAction, 'as'),
    clients: useClientsData(),
    index: defaultValue(ClientListItemAction, 'index'),
    actionLabel: defaultValue(ClientListItemAction, 'actionLabel'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>