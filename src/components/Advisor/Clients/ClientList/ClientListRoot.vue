<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :class="['fb-client-list', componentClasses.getClassByType('component')]"
    >
        <template v-for="(client, i) in clients" :key="i">
            <template v-if="type === 'list'">
                <slot :client="client" :index="i">
                    <ClientListItem :index="i" v-bind="clientListItemOptions" />
                </slot>
            </template>
            <template v-if="type === 'card'">
                <slot :client="client" :index="i">
                    <ClientCardRoot
                        :client="client"
                        v-bind="clientCardOptions"
                        @fb-client-card-action-link:click="emits('fb-client-list-item:click', client)"
                        @fb-client-card-phone-link:click="emits('fb-client-card-phone-link:click', { 'phone': $event})"
                        @fb-client-card-email-link:click="emits('fb-client-card-email-link:click', { 'email': $event})"
                    />
                </slot>
            </template>
        </template>
    </Primitive>
</template>

<script>
import { mergeProps, computed, toRef, reactive, defineProps } from 'vue';
import { PrimitiveProps } from '@/components/Core/Primitive/Primitive';
import { createContext } from '@/modules/shared';
import ClientListItem from "@/components/Advisor/Clients/ClientList/ClientListItem/ClientListItem.vue"
import ClientCardRoot from "@/components/Advisor/Clients/ClientCard/ClientCardRoot.vue"

export const ClientListRootProps = mergeProps(PrimitiveProps, {
    as: {
        type: String,
        default: "ul"
    },
    type: {
        type: String,
        default: "list",
        valitdation: (value) => ['list','card'].includes(value),
        desc: "Render using a ClientListItem or ClientCard component"
    },
    clients: {
        type: Object,
        default: () => {},
        desc: "An array of client data objects"
    },
    clientListItemOptions: {
        type: Object,
        default: () => { return {} },
        desc: "An object of available ClientListItem props"
    },
    clientCardOptions: {
        type: Object,
        default: () => { return {} },
        desc: "An object of available ClientCardRoot props"
    }
})


export const [injectClientListRootContext, provideClientListRootContext] = createContext('ClientListRoot')


</script>

<script setup>
import * as componentClasses from "@/modules/useCommonCSS";
import { Primitive } from '@/components/Core/Primitive';

const props = defineProps(ClientListRootProps)
const emits = defineEmits([
    "fb-client-list-item:click",
    "fb-client-card-phone-link:click",
    "fb-client-card-email-link:click",
])


provideClientListRootContext(reactive({
    getClientByIndex: (index) => props.clients[index],
    clients: toRef(props, 'clients'),
    getClient: (client, index) => { return computed(() => index !== null ? props.clients[index] : client) },
    emitClientItemClick: (index) => { emits('fb-client-list-item:click', props.clients[index])}
}));
</script>
<style lang="scss" scoped>
.fb-client-list {
    list-style-type: none;
}
// .fb-client-list .fb-client-card {
//     display: grid;
//     align-items: center;
//     grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
// }
</style>