<template>
    <Story
        title="Advisor/Clients/ClientList/ClientListItemStat"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstJson v-model="state.clients" title="clients" />
            <PropDesc :component="ClientListRoot" prop="clients" />
            <HstText type="text" v-model="state.index" title="clientIndex" />
            <PropDesc :component="ClientListItemStat" prop="clientIndex" />
            <HstText type="text" v-model="state.statIndex" title="statIndex" />
            <PropDesc :component="ClientListItemStat" prop="statIndex" />  
        </template>

        <Variant
            title="Default"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <ClientListRoot
                    :clients="state.clients"
                    #default="{rootIndex}"
                >
                
                    <ClientListItem
                        :index="rootIndex"
                        #default="{index: statsIndex}"
                    >
                        <ClientListItemStats :index="statsIndex" #default="{clientIndex, statIndex}">
                            <ClientListItemStat
                                :clientIndex="clientIndex"
                                :statIndex="statIndex"
                                :as="state.as"
                            />
                        </ClientListItemStats>
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
                    #default="{rootIndex}"
                >
                
                    <ClientListItem
                        :index="rootIndex"
                        #default="{index: statsIndex}"
                    >
                        <ClientListItemStats :index="statsIndex" #default="{clientIndex, statIndex}">
                            <ClientListItemStat
                                :clientIndex="clientIndex"
                                :statIndex="statIndex"
                                :as="state.as"
                                #default="{client, label, value}"
                            >
                                <span>{{ label }}: </span>
                                <span>{{ value }}</span>
                            </ClientListItemStat>
                        </ClientListItemStats>
                    </ClientListItem>
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
import ClientListItemStats from '@/components/Advisor/Clients/ClientList/ClientListItemStats/ClientListItemStats.vue'
import ClientListItemStat from '@/components/Advisor/Clients/ClientList/ClientListItemStat/ClientListItemStat.vue'

const state = reactive({
    as: defaultValue(ClientListItemStat, 'as'),
    clients: useClientsData(),
    clientIndex: defaultValue(ClientListItemStat, 'clientIndex'),
    statIndex: defaultValue(ClientListItemStat, 'statIndex'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>