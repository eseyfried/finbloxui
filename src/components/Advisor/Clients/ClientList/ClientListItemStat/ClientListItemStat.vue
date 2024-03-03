<template>
    <ListGroupItem
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :class="['fb-client-list-item-stat', componentClasses.getClassByType('component')]"
        v-if="getClient"
    >
        <slot
            :client="transformedClient"
            :label="transformedClient.stats[statIndex]?.label"
            :value="transformedClient.stats[statIndex]?.value"
        >
            <Label>{{ transformedClient.stats[statIndex]?.label }}</Label>
            <Container as="span">{{ transformedClient.stats[statIndex]?.value }}</Container>
        </slot>
    </ListGroupItem>
</template>
<script setup>
import { mergeProps, computed } from "vue";
import { injectClientListRootContext } from '../ClientListRoot.vue'
import { default as Label } from "@/components/Core/Label/Label"
import { default as Container } from "@/components/Core/Container/Container"
import { default as ListGroupItem, ListGroupItemProps } from '@/components/Core/ListGroup/ListGroupItem'
import * as componentClasses from "@/modules/useCommonCSS";
import { formatCurrency, formatPercent } from "@/modules/useFormatter";


const props = defineProps(mergeProps(ListGroupItemProps, {
  client: {
    type: Object
  },
  clientIndex: {
    type: Number,
    desc: "The index position of the client record in the clients records array."
  },
  statIndex: {
    type: Number,
    desc: "The index position of the stat record in the stats records array."
  }
}))

const rootContext = injectClientListRootContext()
const getClient = rootContext.getClient(props.client, props.clientIndex)


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
    let formattedStats = getClient.value?.stats;
    if (getClient.value?.stats) {        
        formattedStats = formattedStats.map((stat) => {
            return {
                ...stat,
                value: applyFormat(stat)
            };
        });
    }
    return {
        ...getClient.value,
        stats: formattedStats
    } 
});
</script>