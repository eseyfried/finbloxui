<template>
    <Story
        title="Advisor/Clients/ClientCard/ClientCardRoot"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.client" title="client" />
            <PropDesc :component="ClientCardRoot" prop="client" />
            <HstCheckbox v-model="state.showAction" title="showAction" />
            <HstCheckbox v-model="state.showStats" title="showStats" />
            <HstCheckbox v-model="state.showContactInfo" title="showContactInfo" />
            <HstText type="text" v-model="state.actionLabel" title="actionLabel" />
            <HstText type="text" v-model="state.as" title="as" /> 
        </template>

        <Variant
            title="Default"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <ClientCardRoot
                    :client="state.client"
                    :as="state.as"
                    :showAction="state.showAction"
                    :actionLabel="state.actionLabel"
                    :showStats="state.showStats"
                    :showContactInfo="state.showContactInfo"
                    @fb-client-card-action-link:click="handleActionClick"
                    @fb-client-card-email-link:click="handleEmailClick"
                    @fb-client-card-phone-link:click="handlePhoneClick"
                />
            </template>
        </Variant>

        <Variant
            title="Custom Layout"
            :init-state="() => initState()"
        >
            <template #default="{state}">
                <ClientCardRoot
                    :client="state.client"
                    :as="state.as"
                    :actionLabel="state.actionLabel"
                    @fb-client-card-action-link:click="handleActionClick"
                    @fb-client-card-email-link:click="handleEmailClick"
                    @fb-client-card-phone-link:click="handlePhoneClick"
                    #default="{ client }"
                >
                    <Container class="fb-client-card-header" v-if="client.name">
                        <ClientCardHouseholdName />
                        <ClientCardName />
                    </Container>
                    <Container
                        class="fb-client-card-contact-info"
                    >
                        <ClientCardPhoneList v-if="client.contact_info.phone" #default="{phone}">
                            <ClientCardPhoneListItem v-for="(phone_item, i) in phone" :key="i">
                                <ClientCardPhoneLabel :index="i" />
                                <ClientCardPhoneValue :index="i" />
                            </ClientCardPhoneListItem>
                        </ClientCardPhoneList>
                        <ClientCardEmail v-if="client.contact_info.email">
                            <ClientCardEmailLabel />
                            <ClientCardEmailLink />
                        </ClientCardEmail>
                        <template v-if="client.contact_info.address">
                            <label>Address</label>
                            <ClientCardAddress />
                        </template>
                    </Container>
                    <ClientCardDataList class="fb-client-card-stats" #default="{data}" >
                        <ClientCardDataListItem v-for="(stat, i) in data" :key="i">
                            <ClientCardDataLabel :index="i" />
                            <ClientCardDataValue :index="i" />
                        </ClientCardDataListItem>
                    </ClientCardDataList>
                    
                    <ClientCardAction />
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
import Container from '@/components/Core/Container/Container'


import ClientCardRoot from '@/components/Advisor/Clients/ClientCard/ClientCardRoot.vue'
import ClientCardName from '@/components/Advisor/Clients/ClientCard/ClientCardName/ClientCardName.vue'
import ClientCardHouseholdName from '@/components/Advisor/Clients/ClientCard/ClientCardHouseholdName/ClientCardHouseholdName.vue'
import ClientCardDataList from '@/components/Advisor/Clients/ClientCard/ClientCardDataList/ClientCardDataList.vue'
import ClientCardDataListItem from '@/components/Advisor/Clients/ClientCard/ClientCardDataListItem/ClientCardDataListItem.vue'
import ClientCardDataLabel from '@/components/Advisor/Clients/ClientCard/ClientCardDataLabel/ClientCardDataLabel.vue'
import ClientCardDataValue from '@/components/Advisor/Clients/ClientCard/ClientCardDataValue/ClientCardDataValue.vue'
import ClientCardPhoneList from '@/components/Advisor/Clients/ClientCard/ClientCardPhoneList/ClientCardPhoneList.vue'
import ClientCardPhoneListItem from '@/components/Advisor/Clients/ClientCard/ClientCardPhoneListItem/ClientCardPhoneListItem.vue'
import ClientCardPhoneLabel from '@/components/Advisor/Clients/ClientCard/ClientCardPhoneLabel/ClientCardPhoneLabel.vue'
import ClientCardPhoneValue from '@/components/Advisor/Clients/ClientCard/ClientCardPhoneValue/ClientCardPhoneValue.vue'
import ClientCardEmail from '@/components/Advisor/Clients/ClientCard/ClientCardEmail/ClientCardEmail.vue'
import ClientCardEmailLabel from '@/components/Advisor/Clients/ClientCard/ClientCardEmailLabel/ClientCardEmailLabel.vue'
import ClientCardEmailLink from '@/components/Advisor/Clients/ClientCard/ClientCardEmailLink/ClientCardEmailLink.vue'
import ClientCardAddress from '@/components/Advisor/Clients/ClientCard/ClientCardAddress/ClientCardAddress.vue'
import ClientCardAction from '@/components/Advisor/Clients/ClientCard/ClientCardAction/ClientCardAction.vue'
    



const state = reactive({
    actionLabel: defaultValue(ClientCardRoot, 'actionLabel'),
    as: defaultValue(ClientCardRoot, 'as'),
    showAction: defaultValue(ClientCardRoot, 'showAction'),
    showStats: defaultValue(ClientCardRoot, 'showStats'),
    showContactInfo: defaultValue(ClientCardRoot, 'showContactInfo'),
    client: useClientData()
})

const initState = (props) => {
    return {
        ...state,
        ...props
    }
}


const handleEmailClick = (email) => { alert(`Email link was clicked with value ${email}`); logEvent('@fb-client-card-email-link:click',{0:email}) }
const handlePhoneClick = (phone) => { alert(`Phone link was clicked with value ${phone}`); logEvent('@fb-client-card-phone-link:click',{0:phone})}
const handleActionClick = (client) => { alert(`Action link was clicked with client ${JSON.stringify(client)}`); logEvent('@fb-client-card-action-link:click',client) }
</script>