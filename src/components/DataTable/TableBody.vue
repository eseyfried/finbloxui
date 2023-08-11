<template>
    <tbody role="rowgroup">
        <template v-if="rows.length > 0">
            <!-- grouped records -->
            <template v-if="groupRowsBy">
                <template v-for="{groupKey, data, index} in rows" :key="index">
                    <tr role="row" class="fb-data-table-group-header">
                        <td :colspan="colspan" :data-cell="groupRowLabel" role="cell">
                            <a href="#" v-if="collapsible" @click.prevent="handleGroupClick(groupKey)">{{ groupKey }}</a>
                            <template v-else>{{ groupKey }}</template>
                        </td>
                        <template v-if="showTotals && groupedTotalsLocation === 'top'">
                            <template v-for="(column, i) in columns" :key="i">
                                <ColumnTotal :rows="data" :column="column" :grouped="true" v-if="column.props.showTotal" />
                            </template>
                            <template v-for="(cell, i) in nonTotalColumns" :key="i">
                                <td v-if="i < nonTotalColumns.length - 1" role="cell" class="fb-data-table-column-total"></td>
                            </template>
                        </template>
                    </tr>
                    <template v-for="(row, index) in data"  :key="index">
                        <tr role="row" :class="{ 'hide': collapsible }" :data-group-id="groupKey">
                            <template v-for="(column, i) in columns" :key="i">
                                <BodyCell :rowData="row" :column="column" />
                            </template>
                        </tr>
                    </template>
                    <template v-if="showTotals && groupedTotalsLocation === 'bottom'">
                        <tr role="row" class="fb-data-table-group-footer">
                            <template v-for="(column, i) in columns" :key="i">
                                <td v-if="nonTotalColumns.includes(column.props.field)" role="cell"></td>
                                <ColumnTotal v-if="column.props.showTotal" :rows="data" :column="column" :grouped="true" />
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
import { computed } from "vue";
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
    },
    groupedTotalsLocation: {
        type: String,
        default: "top",
    },
    collapsible: {
        type: Boolean,
        default: false,
    },
});

const nonTotalColumns = props.columns.filter(column => !column.props.showTotal).map(column => column.props.field);
const colspan = computed(() => {
    return props.showTotals && props.groupedTotalsLocation === "bottom" ? props.columns.length : null;
});
// methods
const handleGroupClick = (groupKey) => {
    const items = document.querySelectorAll(`tr[data-group-id=${groupKey}]`);
    items.forEach((item) => {
        if (item.classList.value.includes("hide")) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
        
    });
}
</script>
<style lang="scss" scoped>

.fb-data-table-group-header {
    position: sticky;
    top: 35px;
}
.fb-data-table-group-header a {
    display: block;
}
.hide {
    display: none;
}


/* Small & Large Mobile Devices */
@media (max-width: 576px) {
    .fb-data-table-group-header {
        top: 0px;
    }
}
</style>