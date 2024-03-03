<template>
    <Story
        title="Advisor/Clients/ClientList/ClientListItem"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstJson v-model="state.clients" title="clients" />
            <PropDesc :component="ClientListRoot" prop="clients" />
            <HstText type="text" v-model="state.index" title="index" />
            <PropDesc :component="ClientListItem" prop="index" />
            <HstJson v-model="state.showStatsByLabel" title="showStatsByLabel" />
            <PropDesc :component="ClientListItem" prop="showStatsByLabel" />
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
                
                    <ClientListItem
                        :index="index"
                        :as="state.as"
                        :showStatsByLabel="state.showStatsByLabel"
                        :actionLabel="state.actionLabel"
                    />
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
                        <ClientListItemHouseholdName :index="index" as="h2" />
                        <ClientListItemName :index="index" as="h3" />
                        <ClientListItemAction href="#">
                            Details
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
import ClientListItemName from '@/components/Advisor/Clients/ClientList/ClientListItemName/ClientListItemName.vue'
import ClientListItemHouseholdName from '@/components/Advisor/Clients/ClientList/ClientListItemHouseholdName/ClientListItemHouseholdName.vue'
import ClientListItemAction from '@/components/Advisor/Clients/ClientList/ClientListItemAction/ClientListItemAction.vue'


const state = reactive({
    as: defaultValue(ClientListItem, 'as'),
    clients: useClientsData(),
    index: defaultValue(ClientListItem, 'index'),
    showStatsByLabel: defaultValue(ClientListItem, 'showStatsByLabel'),
    actionLabel: defaultValue(ClientListItem, 'actionLabel'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>