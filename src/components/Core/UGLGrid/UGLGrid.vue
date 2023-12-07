<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-ugl-grid" :class="componentClasses.getClassByType('component')">
        <MobileFilters />
        <DataTable v-if="lots.length > 0" :rows="lots" v-bind="defaultDataTableOptions" teleportTo=".fb-ugl-grid">
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
import * as componentClasses from "@/modules/useCommonCSS";


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
        default: () => {}
    }
});
const emit = defineEmits(['fb-ugl-grid']);
const defaultDataTableOptions = Base.defaultDataTableOptions(props.dataTableOptions);

// methods
const handleEvent = () => {
    emit("fb-ugl-grid:click", null);
}
</script>
<style lang="scss" scoped>
</style>