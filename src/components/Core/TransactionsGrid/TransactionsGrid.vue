<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-transactions-grid" :class="componentClasses.getClassByType('component')">
        <MobileFilters :slots="slots" />
        <DataTable v-if="transactions.length > 0" :rows="transactions" v-bind="defaultDataTableOptions" teleportTo=".fb-transactions-grid">
            <template v-for="(_, name) in $slots" #[name]="slotData">
                <slot :name="name" v-bind="slotData || {}" />
            </template>
        </DataTable>
    </div>
</template>
<script setup>
// imports
import { useSlots, computed } from "vue";
import DataTable from '@/components/DataTable/DataTable';
import Base from "@/components/DataTable/Base";
import MobileFilters from "@/components/DataTable/MobileFilters";
import * as componentClasses from "@/modules/useCommonCSS";


// vars
const slots = useSlots();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    transactions: {
        type: Array,
        default: () => [],
        desc: "An array of Transaction objects"
    },
    dataTableOptions: {
        type: Object,
        default: () => {},
        desc: "An object containing DataTable component options"
    }
});

const defaultDataTableOptions = computed(() => Base.defaultDataTableOptions(props.dataTableOptions));

// methods

</script>
<style lang="scss" scoped>
</style>