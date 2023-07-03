<template>
    <tbody role="rowgroup">
        <template v-if="rows.length > 0">
            <template v-for="{data, index} in rows"  :key="index">
                <tr role="row">
                    <template v-for="(column, i) in columns"  :key="i">
                        <BodyCell :rowData="data" :column="column" />
                    </template>
                </tr>
            </template>
        </template>
    </tbody>
</template>
<script setup>
import BodyCell from "@/components/DataTable/BodyCell";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    rows: {
        type: Array,
        default: () => [],
    },
    columns: {
        type: Array,
        default: () => [],
    }
});
</script>