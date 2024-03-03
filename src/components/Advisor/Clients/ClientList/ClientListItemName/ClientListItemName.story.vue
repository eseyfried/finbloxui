<template>
    <Story
        title="Advisor/Clients/ClientList/ClientListItemName"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstJson v-model="state.clients" title="clients" />
            <PropDesc :component="ClientListRoot" prop="clients" />
            <HstText type="text" v-model="state.index" title="index" />
            <PropDesc :component="ClientListItem" prop="index" />   
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
                        <ClientListItemName
                            :index="index"
                            :as="state.as"
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
                        <ClientListItemName #default="{client}" :index="index" :as="state.as">
                            <i>{{ client.name.first_name }} {{ client.name.last_name }}</i>
                        </ClientListItemName>
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
import ClientListItemName from '@/components/Advisor/Clients/ClientList/ClientListItemName/ClientListItemName.vue'


const state = reactive({
    as: defaultValue(ClientListItemName, 'as'),
    clients: useClientsData(),
    index: defaultValue(ClientListItemName, 'index'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>