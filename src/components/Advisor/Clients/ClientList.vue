<template>
    <div class="fb-client-list" :class="listType === 'ClientCard' ? 'fb-card' : 'fb-list-item'">
        <template v-for="(client, i) in clients" :key="i">
            <div class="fb-client-list-item">
                <slot :client="client" :props="props">
                    <template v-if="listType === 'ClientCard'">
                        <ClientCard :client="client" v-bind="clientCardOptions" @fb-client-card-details-link:click="handleClientDetailsLinkClick(client)">
                            <template #name="slotProps">
                                <slot name="name" :client="slotProps.client" :props="slotProps.props" />
                            </template>
                            <template #stats="slotProps">
                                <slot name="stats" :client="slotProps.client" :props="slotProps.props" />
                            </template>
                            <template #contact_info="slotProps">
                                <slot name="contact_info" :client="slotProps.client" :props="slotProps.props" />
                            </template>
                            <template #details_link="slotProps">
                                <slot name="details_link" :client="slotProps.client" :props="slotProps.props" />
                            </template>
                        </ClientCard>
                    </template>
                    <template v-if="listType === 'ClientListItem'">
                        <ClientListItem :client="client" v-bind="clientListItemOptions" @fb-client-list-item-details-link:click="handleClientDetailsLinkClick(client)">
                            <template #name="slotProps">
                                <slot name="name" :client="slotProps.client" :props="slotProps.props" />
                            </template>
                            <template #stats="slotProps">
                                <slot name="stats" :client="slotProps.client" :props="slotProps.props" />
                            </template>
                            <template #details_link="slotProps">
                                <slot name="details_link" :client="slotProps.client" :props="slotProps.props" />
                            </template>
                        </ClientListItem>
                    </template>
                </slot>
            </div>
        </template>
    </div>
</template>
<script setup>
import ClientCard from "@/components/Advisor/Clients/ClientCard";
import ClientListItem from "@/components/Advisor/Clients/ClientListItem";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    /**
     * An array of client objects
     */
    clients: {
        type: Array,
        default: () => [],
    },
    listType: {
        type: String,
        validator(value) {
        // The value must match one of these strings
            return ["ClientCard", "ClientListItem"].includes(value)
        },
        default: "ClientListItem"
    },
    clientCardOptions: {
        type: Object,
        default: () => {
            return {
                showContactInfo: false,
            }
        },
    },
    clientListItemOptions: {
        type: Object,
        default: () => {
            return {}
        },
    }
});

const emit = defineEmits(['fb-client-list-details-link:click', 'fb-client-list-item-details-link:click']);

// methods
const handleClientDetailsLinkClick = (client) => {    
    emit('fb-client-list-details-link:click', client);
};
</script>
<style lang="scss" scoped>
.fb-client-list.fb-card {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
</style>
