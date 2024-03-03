<template>
    <Story
        title="Advisor/Clients/ClientList/ClientListItemHouseholdName"
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
                        <ClientListItemHouseholdName
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
                        <ClientListItemHouseholdName #default="{client}" :index="index" :as="state.as">
                            <i>{{ client.name.household }}</i>
                        </ClientListItemHouseholdName>
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
import ClientListItemHouseholdName from '@/components/Advisor/Clients/ClientList/ClientListItemHouseholdName/ClientListItemHouseholdName.vue'

const state = reactive({
    as: defaultValue(ClientListItemHouseholdName, 'as'),
    clients: useClientsData(),
    index: defaultValue(ClientListItemHouseholdName, 'index'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>