<template>
    <thead role="rowgroup">
        <tr role="row">
            <HeaderCell
                v-for="(column, i) in columns"
                :column="column"
                :key="i"
                @header-cell-click="onHeaderCellClick($event)"
            />
        </tr>
    </thead>
</template>
<script setup>
import HeaderCell from "@/components/DataTable/HeaderCell";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    columns: {
        type: Array,
        default: null,
    }
});
const emits = defineEmits(["column-click"]);
// methods
const onHeaderCellClick = (column) => {
    emits("column-click", column);
};
</script>
<style lang="scss" scoped>

</style>