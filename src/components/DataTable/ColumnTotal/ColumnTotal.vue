<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <td :data-cell="Base.header(column)" role="cell" :class="{ 'fb-data-table-column-total': showTotal }">
        <span
            :class="cellClasses"
            v-if="showTotal"
        >
            {{ Base.resolveFieldData(column, rawFieldData) }}
        </span>
    </td>
</template>
<script setup>
// imports
import { computed } from "vue";
import Base from "@/components/DataTable/Base";

// vars
const props = defineProps({
    rows: {
        type: Object,
        default: null
    },
    column: {
        type: Object,
        default: null
    },
    grouped: {
        type: Boolean,
        default: false
    },
});
const showTotal = computed(() => Base.columnProp(props.column, 'showTotal'));
const rawFieldData = computed(() => Base.totalByColumn(props.rows, props.column, props.grouped));
const cellClasses = computed(() => {
    return {
        "fb-positive": Base.hasChangeIndicatorFormat(props.column) && rawFieldData.value > 0,
        "fb-negative": Base.hasChangeIndicatorFormat(props.column) && rawFieldData.value < 0,
    }
})

// methods

</script>
<style lang="scss" scoped>
</style>