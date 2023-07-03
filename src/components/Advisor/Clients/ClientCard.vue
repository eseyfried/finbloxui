<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-client-card" data-component="card">
        <slot name="name" :client="transformedClient" :props="props" v-if="transformedClient.name">
            <div class="fb-client-card-header" v-if="transformedClient.name">
                <h2>{{ transformedClient.name.first_name }} {{ transformedClient.name.last_name }}</h2>
                <h3>{{ transformedClient.name.household }}</h3>
            </div>
        </slot>
        <slot name="stats" :client="transformedClient" :props="props" v-if="transformedClient.stats && showStats">
            <ul class="fb-client-card-stats">
                <template v-if="transformedClient.stats">
                    <li v-for="(stat, i) in transformedClient.stats" :key="i">
                        <label>{{ stat.label }}</label>
                        <span>{{ stat.value }}</span>
                    </li>
                </template>
            </ul>
        </slot>
        <slot
            name="contact_info"
            :client="transformedClient"
            :props="props"
            v-if="transformedClient.contact_info && showContactInfo"
        >
            <div class="fb-client-card-contact-info">
                <ul v-if="transformedClient.contact_info">
                    <li v-if="transformedClient.contact_info.email">
                        <label>{{ transformedClient.contact_info.email.label }}</label>
                        <a
                            :href="`mailto:${transformedClient.contact_info.email.value}`"
                            @click="handleEmailClick(transformedClient.contact_info.email)"
                        >
                            {{ transformedClient.contact_info.email.value }}
                        </a>
                    </li>
                    <template v-if="transformedClient.contact_info.phone">
                        <li v-for="(phone, i) in transformedClient.contact_info.phone" :key="i">
                            <label>{{ phone.label }}</label>
                            <a :href="`tel:${phone.value}`" @click="handlePhoneClick(phone)">{{ phone.value }}</a>
                        </li>
                    </template>
                    <li v-if="transformedClient.contact_info.address">
                        <label>Address</label>
                        <address>
                            <p>{{ transformedClient.contact_info.address.street_1 }}</p>
                            <p v-if="transformedClient.contact_info.address.street_2">{{ transformedClient.contact_info.address.street_2 }}</p>
                            <p>
                                <span>{{ transformedClient.contact_info.address.city }},</span>
                                <span>{{ transformedClient.contact_info.address.state }}</span>
                                <span>{{ transformedClient.contact_info.address.postal_code }}</span>
                            </p>
                        </address>
                    </li>
                </ul>
            </div>
        </slot>
        <slot
            name="details_link"
            v-if="showDetailsLink"
            :client="transformedClient"
            :props="props"
            :eventHandlers="{
                click: (e) => {
                    e.preventDefault();
                    handleDetailsClick(client);
                },
            }"
        >
            <a href="#" @click.prevent="handleDetailsClick(transformedClient)">{{ detailsLinkLabel }}</a>
        </slot>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { formatCurrency, formatPercent } from "@/modules/useFormatter";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    client: {
        type: Object,
        default: () => {},
    },
    showDetailsLink: {
        type: Boolean,
        default: true,
    },
    detailsLinkLabel: {
        type: String,
        default: "Show More"
    },
    showStats: {
        type: Boolean,
        default: true,
    },
    showContactInfo: {
        type: Boolean,
        default: true,
    }
});

const emit = defineEmits([
    'fb-client-card-details-link:click',
    'fb-client-card-contact-link:click',
]);

// methods
const handlePhoneClick = (phone) => {
    emit('fb-client-card-contact-link:click', phone);
};

const handleEmailClick = (email) => {
    emit('fb-client-card-contact-link:click', email);
};

const handleDetailsClick = (client) => {
    emit('fb-client-card-details-link:click', client);
};

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
            value = formatCurrency(stat.value);
            break;
        case "percent":
            value = formatPercent(stat.value);
            break;
    }
    return value;
}


const transformedClient = computed(() => {
    let formattedStats = props.client.stats;
    if (props.client.stats) {
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


</script>
<style lang="scss" scoped>
ul {
    list-style: none;
    padding: unset;
    margin: unset;
}
address {
    font-style: unset;
}
</style>