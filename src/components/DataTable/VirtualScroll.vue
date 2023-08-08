<template>
    <div v-bind="containerProps" :style="`height: ${height}px`" v-if="enabled">
        <div v-bind="wrapperProps">
            <slot :rows="virtualList" :columns="columns" />
        </div>
    </div>
    <slot v-else :rows="listToVirtualList" :columns="columns" />
</template>
<script setup>
import { computed } from "vue";
import { useVirtualList } from "@vueuse/core";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    /**
     * Enable virtual scrolling. If disabled, slot content is loaded with all data rendered
     */
    enabled: {
        type: Boolean,
        default: false,
    },
    /**
     * An array of data to be rendered
     */
    list: {
        type: Array,
        default: () => [],
    },
    /**
     * An array of Column components
     */
    columns: {
        type: Array,
        default: () => [],
    },
    /**
     * The height of the virtual scroll viewport
     */
    height: {
        type: Number,
        default: 400,
    }
});
const { list: virtualList, containerProps, wrapperProps } = useVirtualList(props.list, { 
    itemHeight: 20.5
});
const listToVirtualList = computed(() => {
    const list = props.list.value ? props.list.value : props.list
    /**
     * format list for grouped records
     */
    if (!Array.isArray(list)) {
        const groupKeys = Object.keys(list);
        const groupedList = groupKeys.map((key, index) => {
            return { groupKey: key, data: list[key], index: index }
        });
        console.log(groupedList)
        return groupedList;
    } else {
        return list.map((item, index) => {
            return { groupKey: null, data: item, index: index };
        });
    }
});
</script>