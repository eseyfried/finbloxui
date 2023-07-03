<template>
    <component
        v-if="column.children && column.children.th"
        :is="(column.children && column.children.th)"
        :sorted="sorted"
        :sortDir="sortDir"
        :header="columnProp('header')"
        :field="columnProp('field')"
        :eventHandlers="{ click: onClick }"
        :attrs="{ 'role': 'cell' }"
    />
    <template v-else>
        <th @click="onClick()" role="cell">
            {{ columnProp("header") }}
            <template v-if="columnProp('sortable')">
                <component :is="(column.children && column.children.sortIcon)" :sorted="sorted" :sortDir="sortDir" />
            </template>
        </th>
    </template>
    
</template>
<script setup>
import { ref } from "vue";
import ComponentUtils from "@/modules/ComponentUtils";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    column: {
        type: Object,
        default: null
    },
});

const emits = defineEmits(["header-cell-click"]);

const sortDir = ref("asc");
const sorted = ref(false);

// methods
const columnProp = (prop) => {
    return ComponentUtils.getVNodeProp(props.column, prop);
};

const onClick = () => {
    const event = {
        field: columnProp("field"),
        type: null,
    };
    if (columnProp("sortable")) {
        toggleSortDir();
        sorted.value = true
        event.type = "sort";
        event.sortDir = sortDir.value;
        emits("header-cell-click", event);
    }
    
};

const toggleSortDir = () => {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
};

</script>
<style lang="scss" scoped>
th {
    position: sticky;
    top: 0;
}

</style>