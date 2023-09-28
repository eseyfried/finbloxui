<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="text-white section-2-col grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="flex flex-col mt-8 lg:mt-16">
            <slot name="col1"></slot>
        </div>
        <div class="flex relative w-full">
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