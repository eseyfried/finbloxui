<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-positions-grid" :class="componentClasses.getClassByType('component')">
        <MobileFilters :slots="slots"/>
        <DataTable v-if="positions.length > 0" :rows="positions" v-bind="defaultDataTableOptions" teleportTo=".fb-positions-grid">
            <template v-for="(_, name) in $slots" #[name]="slotData">
                <slot :name="name" v-bind="slotData || {}" />
            </template>
        </DataTable>
    </div>
</template>
<script setup>
// imports
import { useSlots, computed  } from "vue";
import * as componentClasses from "@/modules/useCommonCSS";
import DataTable from '@/components/DataTable/DataTable';
import Base from "@/components/DataTable/Base";
import MobileFilters from "@/components/DataTable/MobileFilters";



// vars

const slots = useSlots();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    positions: {
        type: Array,
        default: () => [],
        desc: "An array of Position objects"
    },
    dataTableOptions: {
        type: Object,
        default: () => { return {} },
        desc: "An object containing DataTable component options"
    }
});

const defaultDataTableOptions = computed(() => Base.defaultDataTableOptions(props.dataTableOptions));

</script>
<style lang="scss" scoped>
</style>