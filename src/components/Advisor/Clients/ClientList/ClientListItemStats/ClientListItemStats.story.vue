<template>
    <Story
        title="Advisor/Clients/ClientList/ClientListItemStats"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstJson v-model="state.clients" title="clients" />
            <PropDesc :component="ClientListRoot" prop="clients" />
            <HstJson v-model="state.showStatsByLabel" title="showStatsByLabel" />
            <PropDesc :component="ClientListItemStats" prop="showStatsByLabel" />
        </template>
        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-2/3">
                    <ClientListRoot
                        :clients="state.clients"
                    >
                        <ClientListItem #default="{index}">
                            <ClientListItemStats
                                :index="index"
                                :as="state.as"
                                :showStatsByLabel="state.showStatsByLabel"
                            />
                        </ClientListItem>
                    </ClientListRoot>
                </div>
            </template>
        </Variant>
        <Variant title="Show Specific Client Stat" :init-state="() => initState({showStatsByLabel: ['Total AUM']})">
            <template #default="{state}">
                <div class="md:tw-w-2/3">
                    <ClientListRoot
                        :clients="state.clients"
                    >
                        <ClientListItem #default="{index}">
                            <ClientListItemStats
                                :index="index"
                                :as="state.as"
                                :showStatsByLabel="state.showStatsByLabel"
                            />
                        </ClientListItem>
                    </ClientListRoot>
                </div>
            </template>
        </Variant>
         <Variant title="Custom Layout" :init-state="() => initState()">
            <template #default="{state}">
                <div class="md:tw-w-2/3">
                    <ClientListRoot
                        :clients="state.clients"
                    >
                        <ClientListItem #default="{index}">
                            <ClientListItemStats
                                :index="index"
                                :as="state.as"
                                :showStatsByLabel="state.showStatsByLabel"
                                #default="{stats, client}"
                            >
                                <template v-for="(statObj, i) in stats" :key="i">
                                    <li>
                                        <span>index: {{ statObj.index }}</span>
                                        <span>{{ statObj.stat.label }}</span>
                                        <span>{{ statObj.stat.value }}</span>
                                    </li>
                                </template>
                            </ClientListItemStats>
                        </ClientListItem>
                    </ClientListRoot>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'

import ClientListRoot from "@/components/Advisor/Clients/ClientList/ClientListRoot"
import ClientListItem from "@/components/Advisor/Clients/ClientList/ClientListItem/ClientListItem"
import ClientListItemStats from "@/components/Advisor/Clients/ClientList/ClientListItemStats/ClientListItemStats"

import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useClientsData } from "@/../.histoire/modules/useClientData";
import PropDesc from '@/../.histoire/components/PropDesc';
import { logEvent } from 'histoire/client'

const clients = useClientsData()
const state = reactive({
    as: defaultValue(ClientListItemStats, "as"),
    index: defaultValue(ClientListItemStats, "index"),
    showStatsByLabel: defaultValue(ClientListItemStats, "showStatsByLabel"),
    clients: clients,
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}
</script>