<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="fb-filters">
        <a href="#" @click.prevent="showFilterOptions = !showFilterOptions" v-if="isMobile">Filter Options</a>
        <div class="fb-data-table-filters" :class="{ 'fb-data-table-filters-visible': showFilterOptions }"></div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { isMobile } from "@/modules/useResponsive";
const showFilterOptions = ref(false);
</script>
<style lang="scss" scoped>
.fb-data-table-filters {
    display: none;
}
.fb-data-table-filters-visible {
    display: block;
}
</style>