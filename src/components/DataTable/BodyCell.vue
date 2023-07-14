<template>
    <component
        v-if="column.children && column.children.td"
        :is="column.children.td"
        :data="rowData"
        :column="column"
        :field="field"
        :attrs="{ 'data-cell': field, 'role': 'cell' }"
    />   
    <template v-else-if="column.props.type && column.props.type === 'actions'">
        <td :data-cell="field" role="cell">
            <ContextMenu v-bind="column.props.contextMenuOptions" />
        </td>
    </template>
    <template v-else>
        <td :data-cell="field" role="cell">{{ resolveFieldData() }}</td>
    </template>
</template>
<script setup>
import { computed } from "vue";
import ComponentUtils from "@/modules/ComponentUtils";
import ContextMenu from "@/components/Core/Navigation/ContextMenu/ContextMenu";
const props = defineProps({
    rowData: {
        type: Object,
        default: null
    },
    column: {
        type: Object,
        default: null
    },
});
const field = computed(() => {
    return columnProp('field');
});
const resolveFieldData = () => {
    return ComponentUtils.resolveFieldData(props.rowData, field.value);
}
const columnProp = (prop) => {
    return ComponentUtils.getVNodeProp(props.column, prop);
};
</script>
<style lang="scss" scoped>

</style>