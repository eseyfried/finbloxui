<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
    </div>
</template>
<script setup>
import { computed, ref } from "vue";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    title: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    icon: {
        type: String,
        default: null
    },
    font: {
        type: String,
        default: "--fa-font-solid"
    },
    color: {
        type: String,
        default: "text-green-500"
    }
});
const getIcon = computed(() => {
    return `"\\${props.icon.replace(/\\/g, '')}"`;
});

const getFont = computed(() => {
    if (props.font === "brands") {
        return "normal 400 1em/1 'Font Awesome 6 Brands'";
    } else {
        return "normal 900 1em/1 'Font Awesome 6 Free'";
    }
    });

</script>
<style lang="scss">

.card {
    @apply mb-10 md:m-0 p-4 rounded-lg bg-[#18181b];
    h2 {
        @apply text-green-500 text-lg pb-3 font-semibold;
    }
    h2::before {
        font: v-bind('getFont');
        @apply mr-2 p-2 rounded-full items-center bg-zinc-700 text-green-500;
    }
    h2::before {
        content: v-bind(getIcon);
    }
    p {
        @apply text-gray-200;
    }
}
</style>