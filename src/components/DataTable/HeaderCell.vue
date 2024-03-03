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
                <component
                    :is="(column.children && column.children.sortIcon)"
                    :sorted="sorted"
                    :sortDir="sortDir"
                />
            </template>
            <template v-if="teleportTo && hasFilters">
                <teleport :to="`${teleportTo} .fb-data-table-filters`" :disabled="!isMobile">
                    <component
                        v-if="column.children && Object.hasOwn(column.children, 'default')"
                        :is="column.children.default()[0]"
                        :column="column"
                        :buttonLabel="isMobile ? columnProp('header') : null"
                        :selectOptions="column.children.default()[0].props.selectOptions || selectOptions"
                        @fb-column-filter-apply-button:click="handleApplyFilter($event)"
                        @fb-column-filter-clear-button:click="handleClearFilter($event)"
                    />
                </teleport>
            </template>
            <template v-else>
                <component
                        v-if="column.children && Object.hasOwn(column.children, 'default')"
                        :is="column.children.default()[0]"
                        :column="column"
                        :buttonLabel="isMobile ? columnProp('header') : null"
                        :selectOptions="column.children.default()[0].props.selectOptions || selectOptions"
                        @fb-column-filter-apply-button:click="handleApplyFilter($event)"
                        @fb-column-filter-clear-button:click="handleClearFilter($event)"
                    />
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
    rows: {
        type: Array,
        default: () => {},
    },
    isMobile: {
        type: Boolean,
        default: false
    },
    teleportTo: {
        type: String,
        default: null
    }
});


const hasFilters = ComponentUtils.hasComponent(props.column.children, 'ColumnFilter')


const emits = defineEmits([
    "header-cell-click",
    "header-cell-apply-filter",
    "header-cell-clear-filter",
]);

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

const handleApplyFilter = (event) => {
    emits("header-cell-apply-filter", event);
}

const handleClearFilter = (event) => {
    emits("header-cell-clear-filter", event);
}

const toggleSortDir = () => {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
};

const columnData = (field) => {
    return props.rows.map((row) => {
        return row.data[field]
    })
};
const selectOptions = columnData(columnProp('field'));

</script>
<style lang="scss" scoped>
th {
    position: sticky;
    top: 0;
}

</style>