<template>
    <Story
        title="Advisor/Clients/ClientList/ClientListRoot"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstSelect v-model="state.type" title="type" :options="['list', 'card']" />
            <PropDesc :component="ClientListRoot" prop="type" />
            <HstText type="text" v-model="state.as" title="as" />
            <HstJson v-model="state.clients" title="clients" />
            <PropDesc :component="ClientListRoot" prop="clients" />
            <HstJson v-model="state.clientListItemOptions" title="clientListItemOptions" />
            <PropDesc :component="ClientListRoot" prop="clientListItemOptions" />
            <HstJson v-model="state.clientCardOptions" title="clientCardOptions" />
            <PropDesc :component="ClientListRoot" prop="clientCardOptions" />
        </template>
        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="">
                    <ClientListRoot
                        :clients="state.clients"
                        :as="state.as"
                        :type="state.type"
                        :clientListItemOptions="state.clientListItemOptions"
                        @fb-client-list-item:click="handleItemClick"
                        @fb-client-card-phone-link:click="handleCardPhoneClick"
                        @fb-client-card-email-link:click="handleCardEmailClick"
                    >
                    </ClientListRoot>
                </div>
            </template>
        </Variant>
        <Variant title="Show Specific Client Stat" :init-state="() => initState({'clientListItemOptions':{'showStatsByLabel':['Total AUM']}})">
            <template #default="{state}">
                <div class="md:tw-w-2/3">
                    <ClientListRoot
                        :clients="state.clients"
                        :as="state.as"
                        :type="state.type"
                        :clientListItemOptions="state.clientListItemOptions"
                        @fb-client-list-item:click="handleItemClick"
                        @fb-client-card-phone-link:click="handleCardPhoneClick"
                        @fb-client-card-email-link:click="handleCardEmailClick"
                    >
                    </ClientListRoot>
                </div>
            </template>
        </Variant>
        <Variant title="Custom Action Label" :init-state="() => initState({'clientListItemOptions':{'actionLabel': 'details','showStatsByLabel':['Total AUM']}})">
            <template #default="{state}">
                <div class="md:tw-w-2/3">
                    <ClientListRoot
                        :clients="state.clients"
                        :as="state.as"
                        :type="state.type"
                        :clientListItemOptions="state.clientListItemOptions"
                        @fb-client-list-item:click="handleItemClick"
                        @fb-client-card-phone-link:click="handleCardPhoneClick"
                        @fb-client-card-email-link:click="handleCardEmailClick"
                    >
                    </ClientListRoot>
                </div>
            </template>
        </Variant>
        <Variant title="Custom Layout" :init-state="() => initState()">
            <template #default="{state}">
                <div class="md:tw-w-2/3">
                    <ClientListRoot
                        :clients="state.clients"
                        :as="state.as"
                        :type="state.type"
                        :clientListItemOptions="state.clientListItemOptions"
                        @fb-client-list-item:click="handleItemClick"
                        @fb-client-card-phone-link:click="handleCardPhoneClick"
                        @fb-client-card-email-link:click="handleCardEmailClick"
                        #default="{client, index}"
                    >
                        <ClientListItem :client="client" :index="index">
                            <ClientListItemHouseholdName :index="index" as="h2" />
                            <ClientListItemName :index="index" as="h3" />
                            <ClientListItemAction :index="index" as="button">more</ClientListItemAction>
                        </ClientListItem>
                    </ClientListRoot>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'

import ClientListRoot from '@/components/Advisor/Clients/ClientList/ClientListRoot.vue'
import ClientListItem from '@/components/Advisor/Clients/ClientList/ClientListItem/ClientListItem.vue'
import ClientListItemName from '@/components/Advisor/Clients/ClientList/ClientListItemName/ClientListItemName.vue'
import ClientListItemHouseholdName from '@/components/Advisor/Clients/ClientList/ClientListItemHouseholdName/ClientListItemHouseholdName.vue'
import ClientListItemAction from '@/components/Advisor/Clients/ClientList/ClientListItemAction/ClientListItemAction.vue'

import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useClientsData } from "@/../.histoire/modules/useClientData";
import PropDesc from '@/../.histoire/components/PropDesc';
import { logEvent } from 'histoire/client'

const clients = useClientsData()
const state = reactive({
    as: defaultValue(ClientListRoot, "as"),
    type: defaultValue(ClientListRoot, "type"),
    clients: clients,
    clientListItemOptions: defaultValue(ClientListRoot, "clientListItemOptions")
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}
const handleItemClick = (client) => { alert(`Action was clicked with value ${JSON.stringify(client)}`); logEvent('@fb-client-list-item:click',client) }
const handleCardPhoneClick = (phone) => { alert(`Phone was clicked with value ${JSON.stringify(phone)}`); logEvent('@fb-client-card-phone-link:click',phone) }
const handleCardEmailClick = (email) => { alert(`Email was clicked with value ${JSON.stringify(email)}`); logEvent('@fb-client-card-email-link:click',email) }
</script>