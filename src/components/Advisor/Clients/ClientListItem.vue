<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-client-list-item" data-component="card" :class="componentClasses.getClassByType('component')">
        <slot name="name" :client="transformedClient" :props="props" v-if="transformedClient.name">
            <div class="fb-client-list-item-header" v-if="transformedClient.name">
                <h2>{{ transformedClient.name.first_name }} {{ transformedClient.name.last_name }}</h2>
                <h3>{{ transformedClient.name.household }}</h3>
            </div>
        </slot>
        <slot name="stats" :client="transformedClient" :props="props" v-if="transformedClient.stats">
            <ul class="fb-client-list-item-stats">
                <template v-if="transformedClient.stats">
                    <li v-for="(stat, i) in transformedClient.stats" :key="i">
                        <label>{{ stat.label }}</label>
                        <span>{{ stat.value }}</span>
                    </li>
                </template>
            </ul>
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
import * as componentClasses from "@/modules/useCommonCSS";
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
    showStatsByLabel: {
        type: Array,
        default: () => [],
    }
});

const emit = defineEmits([
    'fb-client-list-item-details-link:click',
]);

// methods

const handleDetailsClick = (client) => {
    emit('fb-client-list-item-details-link:click', client);
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
        const filteredStats = sortedStats.filter((stat) => {
            return props.showStatsByLabel.includes(stat.label);
        });
        if(props.showStatsByLabel.length === 0) {
            filteredStats.push(props.client.stats[0]); 
        }
        
        formattedStats = filteredStats.map((stat) => {
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
.fb-client-list-item {
    display: grid;
    width: 100%;
    grid-template-columns: 3fr fit-content(40%) 0.5fr;
}
</style>