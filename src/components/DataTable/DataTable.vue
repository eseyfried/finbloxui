<template v-slot="slotProps">
    <VirtualScroll :list="rows" :columns="columns" :enabled="useVirtualScroll" :height="virtualScrollHeight">
        <template #default="slopProps">
            <table v-bind="$attrs" role="table">
                <TableHeader
                    :columns="slopProps.columns"
                    @column-click="onColumnHeaderClick($event)"
                />
                <TableBody :columns="slopProps.columns" :rows="slopProps.rows" />
            </table>
        </template>
    </VirtualScroll>
</template>
<script setup>
import { computed, useSlots } from "vue";
import Base from "@/components/DataTable/Base";
import VirtualScroll from "@/components/DataTable/virtualScroll";
import TableHeader from "@/components/DataTable/TableHeader";
import TableBody from "@/components/DataTable/TableBody";
const slots = useSlots();
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    /**
     * An array of json objects rendered as table rows
     */
    rows: {
        type: Array,
        default: () => []
    },
    /**
     * Use virtual scrolling for DOM performance with super large datasets
     */
    useVirtualScroll: {
        type: Boolean,
        default: false,
    },
    /**
     * Height of the table when in virtual scroll mode
     */
    virtualScrollHeight: {
        type: Number,
        default: 400,
    }
});

const emits = defineEmits(["column-click"]);

const columns = Base.columns(slots);

// methods
const onColumnHeaderClick = (column) => {
    emits("column-click", column);
};
</script>
<style lang="scss" scoped>
@import "@/scss/variables.scss";
table {
    border-collapse: collapse;
    width: 100%;
    
}

@media (max-width: $break-point-sm - 1) {
    table:deep(th) {
        display: none;
    }
    table:deep(td) {
        display: grid;
        gap: 0.5rem;
        grid-template-columns: 5ch auto;
    }
    table:deep(td::before) {
        content: attr(data-cell) ": ";
        text-transform: capitalize;
    }
}
</style>