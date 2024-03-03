<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :class="['fb-client-list-item', componentClasses.getClassByType('component')]"
        v-if="getClient"
    >
        <slot
            :client="getClient"
            :index="index"
        >
            <Container>
                <ClientListItemName :index="index" />
                <ClientListItemHouseholdName :index="index" />
            </Container>
            <ClientListItemStats :index="index" :showStatsByLabel="showStatsByLabel" />
            <ClientListItemAction :index="index" href="#">
                {{ actionLabel }}
            </ClientListItemAction>
        </slot>
    </Primitive>
</template>
<script>
export const ClientListItemProps = mergeProps(PrimitiveProps, {
    as: {
        type: String,
        default: 'li'
    },
    client: {
        type: Object
    },
    index: {
        type: Number,
        default: 0,
        desc: "The index position of the client record in the clients records array."
    },
    showStatsByLabel: {
        type: Array,
        default: () => [],
        desc: "Show only client data stats that match text labels in this list."
    },
    actionLabel: {
        type: String,
        default: () => ClientListItemActionProps.actionLabel.default,
        desc: "The text label for the action element"
    }
})
</script>
<script setup>
import { mergeProps } from "vue";
import { injectClientListRootContext } from '../ClientListRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'
import Container from '@/components/Core/Container/Container'
import * as componentClasses from "@/modules/useCommonCSS";

import ClientListItemName from '@/components/Advisor/Clients/ClientList/ClientListItemName/ClientListItemName.vue'
import ClientListItemHouseholdName from '@/components/Advisor/Clients/ClientList/ClientListItemHouseholdName/ClientListItemHouseholdName.vue'
import ClientListItemStats from '@/components/Advisor/Clients/ClientList/ClientListItemStats/ClientListItemStats.vue'
import { 
    default as ClientListItemAction, 
    ClientListItemActionProps
} from '@/components/Advisor/Clients/ClientList/ClientListItemAction/ClientListItemAction.vue'


const props = defineProps(ClientListItemProps)
const rootContext = injectClientListRootContext()
const getClient = rootContext.getClient(props.client, props.index)
</script>