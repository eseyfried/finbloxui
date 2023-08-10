<template>
    <tbody role="rowgroup">
        <template v-if="rows.length > 0">
            <!-- grouped records -->
            <template v-if="groupRowsBy">
                <template v-for="{groupKey, data, index} in rows"  :key="index">
                    <tr role="row" class="fb-data-table-group-header">
                        <td :colspan="columns.length" :data-cell="groupRowLabel" role="cell">
                            {{ groupKey }}
                        </td>
                    </tr>
                    <template v-for="(row, index) in data"  :key="index">
                        <tr role="row">
                            <template v-for="(column, i) in columns"  :key="i">
                                <BodyCell :rowData="row" :column="column" />
                            </template>
                        </tr>
                    </template>
                    <template v-if="showTotals">
                        <tr role="row" class="fb-data-table-group-footer">
                            <template v-for="(column, i) in columns"  :key="i">
                                <ColumnTotal :rows="data" :column="column" :grouped="true" />
                            </template>
                        </tr>
                    </template>
                </template>
            </template>
            <template v-else v-for="{data, index} in rows"  :key="index">
                <tr role="row">
                    <template v-for="(column, i) in columns"  :key="i">
                        <BodyCell :rowData="data" :column="column" />
                    </template>
                </tr>
            </template>
            <template v-if="showTotals">
                <tr role="row" class="fb-data-table-group-footer">
                    <template v-for="(column, i) in columns"  :key="i">
                        <ColumnTotal :rows="rows" :column="column" />
                    </template>
                </tr>
            </template>
        </template>
    </tbody>
</template>
<script setup>
import BodyCell from "@/components/DataTable/BodyCell";
import ColumnTotal from "@/components/DataTable/ColumnTotal/ColumnTotal";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    rows: {
        type: Array,
        default: () => [],
    },
    columns: {
        type: Array,
        default: () => [],
    },
    groupRowsBy: {
        type: String,
        default: null,
    },
    groupRowLabel: {
        type: String,
        default: null,
    },
    showTotals: {
        type: Boolean,
        default: false,
    }
});


</script>
<style lang="scss" scoped>

.fb-data-table-group-header {
    position: sticky;
    top: 35px;
}
tr:not(.fb-data-table-group-header) {
    // display: none;
}

/* Small & Large Mobile Devices */
@media (max-width: 576px) {
    .fb-data-table-group-header {
        top: 0px;
    }
}
</style>