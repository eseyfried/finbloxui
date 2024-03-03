<template>
    <ListGroupRoot
        :as="as"
        :class="['fb-client-list-item-stats', componentClasses.getClassByType('component')]"
    >
        <template v-for="(stat, i) in filteredStats" :key="i">
            <slot
                :stats="filteredStats"
                :client="getClient"
                :statIndex="stat.index"
                :clientIndex="index"
            >
                <ClientListItemStat :clientIndex="index" :statIndex="stat.index" />
            </slot>
        </template>
    </ListGroupRoot>
</template>
<script setup>
import { findIndex } from "lodash"
import { mergeProps, computed } from "vue";
import { injectClientListRootContext } from '../ClientListRoot.vue'
import ClientListItemStat from '@/components/Advisor/Clients/ClientList/ClientListItemStat/ClientListItemStat'
import { default as ListGroupRoot, ListGroupRootProps } from '@/components/Core/ListGroup/ListGroupRoot'
import * as componentClasses from "@/modules/useCommonCSS";

const props = defineProps(mergeProps(ListGroupRootProps, {
    client: {
        type: Object
    },
    index: {
        type: Number,
        desc: "The indexed position of the client object in the clients array"
    },
    showStatsByLabel: {
        type: Array,
        default: () => [],
        desc: "Show only client data stats that match text labels in this list."
    }
}))
const rootContext = injectClientListRootContext()
const getClient = rootContext.getClient(props.client, props.index)

const sortByOrder = (list) => {
    if (typeof list !== 'object') {
        return list;
    }
    return list.sort((a, b) => (a.order > b.order) ? 1 : -1);
}

const filteredStats = computed(() => {
    const sortedStats = sortByOrder(getClient.value?.stats);
    const filtered = sortedStats.filter((stat) => {
        return props.showStatsByLabel.length ? props.showStatsByLabel.includes(stat.label) : props.showStatsByLabel;
    }).map(stat => { return { index: findIndex(sortedStats, ['label', stat.label]) , stat: stat } });
    return filtered
})
</script>
<style lang="scss" scoped>
.fb-client-list-item-stats {
    list-style-type: none;
}
</style>