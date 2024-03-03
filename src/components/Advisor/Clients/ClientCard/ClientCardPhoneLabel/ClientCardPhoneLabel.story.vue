<template>
    <Story
        title="Advisor/Clients/ClientCard/ClientCardPhoneLabel"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.client" title="client" />
            <PropDesc :component="ClientCardRoot" prop="client" />
            <PropDesc :component="ClientCardPhoneLabel" prop="index" />
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
                    <ClientCardPhoneList #default="{phone}">
                        <ClientCardPhoneListItem  v-for="(item, i) in phone" :key="i">
                            <ClientCardPhoneLabel :as="state.as" :index="i" />
                        </ClientCardPhoneListItem>
                    </ClientCardPhoneList>
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
                    <ClientCardPhoneList #default="{phone}">
                        <ClientCardPhoneListItem  v-for="(item, i) in phone" :key="i">
                            <ClientCardPhoneLabel :as="state.as" :index="i" #default="{label}">
                                <strong>{{ label }}:</strong>
                            </ClientCardPhoneLabel>
                        </ClientCardPhoneListItem>
                    </ClientCardPhoneList>
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
import ClientCardPhoneList from '@/components/Advisor/Clients/ClientCard/ClientCardPhoneList/ClientCardPhoneList.vue'
import ClientCardPhoneListItem from '@/components/Advisor/Clients/ClientCard/ClientCardPhoneListItem/ClientCardPhoneListItem.vue'
import ClientCardPhoneLabel from '@/components/Advisor/Clients/ClientCard/ClientCardPhoneLabel/ClientCardPhoneLabel.vue'
const state = reactive({
    as: defaultValue(ClientCardPhoneLabel, 'as'),
    client: useClientData()
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

</script>