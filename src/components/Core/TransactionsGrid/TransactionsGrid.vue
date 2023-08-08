<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-transactions-grid">
        <MobileFilters />
        <DataTable v-if="transactions.length > 0" :rows="transactions" v-bind="defaultDataTableOptions" teleportTo=".fb-transactions-grid">
            <template v-for="(_, name) in $slots" #[name]="slotData">
                <slot :name="name" v-bind="slotData || {}" />
            </template>
        </DataTable>
    </div>
</template>
<script setup>
// imports
import { useSlots } from "vue";
import DataTable from "@/components/DataTable/DataTable";
import Base from "@/components/DataTable/Base";
import MobileFilters from "@/components/DataTable/MobileFilters";


// vars
const slots = useSlots();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    transactions: {
        type: Array,
        default: () => [],
    },
    dataTableOptions: {
        type: Object,
        default: () => {}
    }
});
const emit = defineEmits(['fb-transactions-grid']);
const defaultDataTableOptions = Base.defaultDataTableOptions(props.dataTableOptions);


// methods
const handleEvent = () => {
    emit("fb-transactions-grid:click", null);
}
</script>
<style lang="scss" scoped>
</style>