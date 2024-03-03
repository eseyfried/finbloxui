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
    @apply tw-mb-10 md:tw-m-0 tw-p-4 tw-rounded-lg tw-bg-[#18181b];
    h2 {
        @apply tw-text-green-500 tw-text-lg tw-pb-3 tw-font-semibold;
    }
    h2::before {
        font: v-bind('getFont');
        @apply tw-mr-2 tw-p-2 tw-rounded-full tw-items-center tw-bg-zinc-700 tw-text-green-500;
    }
    h2::before {
        content: v-bind(getIcon);
    }
    p {
        @apply tw-text-gray-200;
    }
}
</style>