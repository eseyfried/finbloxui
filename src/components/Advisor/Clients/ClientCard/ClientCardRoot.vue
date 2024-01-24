<script>
import { mergeProps, computed, toRef } from 'vue';
import { PrimitiveProps } from '@/components/Core/Primitive';
import { createContext } from '@/modules/shared';
export const ClientCardRootProps = mergeProps(PrimitiveProps, {
    client: {
        type: Object,
        default: () => {},
    },
    showStats: {
        type: Boolean,
        default: true
    },
    showAction: {
        type: Boolean,
        default: true
    },
    showContactInfo: {
        type: Boolean,
        default: true,
    },
    actionLabel: {
        type: String,
        default: "show more"
    }
})

export const [injectClientCardRootContext, provideClientCardRootContext]
  = createContext('ClientCardRoot')
</script>
<script setup>
import * as formatters from "@/modules/useFormatter";
import * as componentClasses from "@/modules/useCommonCSS";
import { Primitive } from '@/components/Core/Primitive';
import { Container } from '@/components/Core/Container';
import {
    ClientCardName,
    ClientCardHouseholdName,
    ClientCardDataList,
    ClientCardDataListItem,
    ClientCardDataLabel,
    ClientCardDataValue,
    ClientCardEmail,
    ClientCardEmailLabel,
    ClientCardEmailLink,
    ClientCardPhoneList,
    ClientCardPhoneListItem,
    ClientCardPhoneLabel,
    ClientCardPhoneValue,
    ClientCardAddress,
    ClientCardAction
} from '@/components/Advisor/Clients/ClientCard/';



const props = defineProps(ClientCardRootProps)

const emit = defineEmits([
    'fb-data-point-action-link:click',
    'fb-client-card-email-link:click',
    'fb-client-card-phone-link:click',
]);

const sortByOrder = (list) => {
    if (typeof list !== 'object') {
        return list;
    }
    return list.sort((a, b) => (a.order > b.order) ? 1 : -1);
}

const applyFormat = (stat) => {
    let value = stat.value;
    switch (stat.format) {
        case "currency":
            value = formatters.formatCurrency(stat.value);
            break;
        case "percent":
            value = formatters.formatPercent(stat.value);
            break;
    }
    return value;
}


const transformedClient = computed(() => {
    let formattedStats = props.client?.stats;
    if (props.client?.stats) {
        const sortedStats = sortByOrder(props.client.stats);
        formattedStats = sortedStats.map((stat) => {
            return {
                ...stat,
                value: applyFormat(stat)
            };
        });
    }
    return {
        ...props.client,
        stats: formattedStats
    } 
});


provideClientCardRootContext({
    showStats: toRef(props, 'showStats').value,
    showAction: toRef(props, 'showAction'),
    showContactInfo: toRef(props, 'showContactInfo').value,
    getClient: () => transformedClient.value,
    handleEmailClick: () => emit('fb-client-card-email-link:click', transformedClient.value.contact_info.email.value),
    handlePhoneClick: (phone) => emit('fb-client-card-phone-link:click', phone),
    handleActionClick: () => emit('fb-client-card-action-link:click', transformedClient.value),
    actionLabel: toRef(props, 'actionLabel').value, // make this reactive to prop changes so injected value update
});

</script>

<template>
    <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
        <slot :client="transformedClient">
            <div class="fb-client-card" :class="componentClasses.getClassByType('component')" data-component="card">
                <Container class="fb-client-card-header" v-if="transformedClient.name">
                    <ClientCardName />
                    <ClientCardHouseholdName />
                </Container>
                <ClientCardDataList class="fb-client-card-stats" #default="props" v-if="showStats">
                    <ClientCardDataListItem v-for="(stat, i) in props.data" :key="i">
                        <ClientCardDataLabel :index="i" />
                        <ClientCardDataValue :index="i" />
                    </ClientCardDataListItem>
                </ClientCardDataList>
                <Container
                    class="fb-client-card-contact-info"
                    v-if="transformedClient.contact_info && showContactInfo"
                >
                    <ClientCardPhoneList v-if="transformedClient.contact_info.phone" #default="props">
                        <ClientCardPhoneListItem v-for="(phone, i) in props.phone" :key="i">
                            <ClientCardPhoneLabel :index="i" />
                            <ClientCardPhoneValue :index="i" />
                        </ClientCardPhoneListItem>
                    </ClientCardPhoneList>
                    <ClientCardEmail v-if="transformedClient.contact_info.email">
                        <ClientCardEmailLabel />
                        <ClientCardEmailLink />
                    </ClientCardEmail>
                    <template v-if="transformedClient.contact_info.address">
                        <label>Address</label>
                        <ClientCardAddress />
                    </template>
                </Container>
                <ClientCardAction v-if="showAction" />
            </div>
        </slot>
    </Primitive>
</template>