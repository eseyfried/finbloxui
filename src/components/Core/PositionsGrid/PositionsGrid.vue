<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-positions-grid">
        <DataTable v-if="positions.length > 0" :rows="positions">
            <template v-for="(_, name) in $slots" #[name]="slotData">
                <slot :name="name" v-bind="slotData || {}" />
            </template>
        </DataTable>
    </div>
</template>
<script setup>
// imports
import { useSlots } from "vue";
import * as formatters from "@/modules/useFormatter";
import DataTable from "@/components/DataTable/DataTable";
import Column from "@/components/DataTable/Column";
import Base from "@/components/DataTable/Base";

// vars
const slots = useSlots();
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    positions: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['fb-positions-grid']);

const columns = Base.columns(slots);

// methods
const handleEvent = () => {
    emit("fb-positions-grid:click", null);
}
</script>
<style lang="scss" scoped>
</style>