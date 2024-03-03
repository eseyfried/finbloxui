<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="fb-filters" v-if="hasFilters">
        <a href="#" @click.prevent="showFilterOptions = !showFilterOptions" v-if="isMobile">Filter Options</a>
        <div class="fb-data-table-filters" :class="{ 'fb-data-table-filters-visible': showFilterOptions }"></div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { isMobile } from "@/modules/useResponsive";
import ComponentUtils from "@/modules/ComponentUtils";
const props = defineProps({
    slots: {
        // type: Function,
        required: true
    }
})
const showFilterOptions = ref(false);

const hasFilters = ComponentUtils.hasComponent(props.slots, 'ColumnFilter')

</script>
<style lang="scss" scoped>
.fb-data-table-filters {
    display: none;
}
.fb-data-table-filters-visible {
    display: block;
}
</style>