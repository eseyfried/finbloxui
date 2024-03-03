<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="tw-text-white section-2-col tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4">
        <div class="tw-flex tw-flex-col tw-mt-8 lg:tw-mt-16">
            <slot name="col1"></slot>
        </div>
        <div class="tw-flex tw-relative tw-w-full">
            <slot name="col2"></slot>
        </div>
    </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    
});
</script>
<style lang="scss" scoped>

</style>