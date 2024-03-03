<!-- eslint-disable vue/valid-template-root -->
<template>
    <HomeView />
</template>
<script setup>
import HomeView from "@/views/HomeView2.vue";
</script>
<style lang="scss">
.fb-negative {
    @apply tw-text-red-800;
}
.fb-positive {
    @apply tw-text-green-800;
}
.fb-positive::before {
    content: "\f062";
    font: var(--fa-font-solid);
}
.fb-negative::before {
    content: "\f063";
    font: var(--fa-font-solid);
}

</style>
