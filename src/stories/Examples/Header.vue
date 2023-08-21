<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="header">
        <span class="logo">{{ brandName }}</span>
        <div class="menu">
            <a href="#" class="profile">Kyle Larson</a>
            <a href="#" class="logout">Logout</a>
        </div>
    </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    brandName: {
        type: String,
        default: ""
    }
});
</script>