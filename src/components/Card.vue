<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card">
        <h1>{{ title }}</h1>
        <p>{{ body }}</p>
        <div class="footer">
            {{ footer }}
        </div>
    </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    body: {
        type: String,
        default: "",
    },
    footer: {
        type: String,
        default: "",
    },
});
</script>