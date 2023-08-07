<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-ugl-grid">
        <MobileFilters />
        <DataTable v-if="lots.length > 0" :rows="lots" v-bind="dataTableOptions" teleportTo=".fb-ugl-grid">
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
import MobileFilters from "@/components/DataTable/MobileFilters";


// vars
const slots = useSlots();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    lots: {
        type: Array,
        default: () => [],
    },
    dataTableOptions: {
        type: Object,
        default: () => {
            return {
                columnSelector: true,
            }
        }
    }
});
const emit = defineEmits(['fb-ugl-grid']);


// methods
const handleEvent = () => {
    emit("fb-ugl-grid:click", null);
}
</script>
<style lang="scss" scoped>
</style>